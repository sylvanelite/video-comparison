

//importScripts("imagehash-web.js");


//https://github.com/simon987/imagehash-web/blob/main/lib/hash.js
class ImageHash {

    binArray;

    /**
     * @param binArray {Uint8ClampedArray}
     */
    constructor(binArray) {
        this.binArray = binArray;
    }


    toHexString() {
        let str = "";

        for (let i = 0; i < this.binArray.length; i += 8) {
            const c =
                this.binArray[i] |
                this.binArray[i + 1] << 1 |
                this.binArray[i + 2] << 2 |
                this.binArray[i + 3] << 3 |
                this.binArray[i + 4] << 4 |
                this.binArray[i + 5] << 5 |
                this.binArray[i + 6] << 6 |
                this.binArray[i + 7] << 7;

            str += c.toString(16).padStart(2, "0");
        }

        return str;
    }


}




//https://github.com/simon987/imagehash-web/blob/main/lib/imageUtils.js
class CanvasUtil {

    /**
     * @param image {Image|HTMLImageElement}
     * @param width {number}
     * @param height {number}
     * @param options {{
     *     sx: {number},
     *     sy: {number},
     *     sw: {number},
     *     sh: {number},
     * }}
     * @return {Uint8ClampedArray}
     */
    async resizeImageAndGetData(image, width, height, options = {}) {
        let canvas = await this.resizeImage(image, width, height, options);

        const ctx = canvas.getContext("2d");
        return ctx.getImageData(0, 0, width, height).data;
    }

    async loadImage(str) {
        return loadImage(str);
    }

    async resizeImage(image, width, height, options) {
        const {sx, sy, sw, sh} = options;

        let toCanvas;
        let pica;

		toCanvas = new OffscreenCanvas(width, height);
		const ctx = toCanvas.getContext('2d');
		ctx.drawImage(image,0,0,width, height);
		/*
		pica = new Pica({
			tile: 1024,
			concurrency: 1,
			features: ["js"],
			idle: 2000,
			createCanvas
		});
		
        await pica.resize(fromCanvas, toCanvas);
		*/

        return toCanvas;
    }


    
}
const canvasUtil = new CanvasUtil();


//https://github.com/simon987/imagehash-web/blob/main/lib/imageUtils.js
class GrayScaleConverter {

    /**
     *
     * RGBA -> L (ITU-R 601-2 luma transform)
     *
     * @param imgData {Uint8ClampedArray}
     */
    convert(imgData) {
        const arr = new Uint8ClampedArray(imgData.length / 4);

        for (let i = 0; i < imgData.length; i += 4) {
            arr[i>>2] = Math.round((imgData[i] * 299 / 1000 + imgData[i + 1] * 587 / 1000 + imgData[i + 2] * 114 / 1000))
        }

        return arr;
    }
}

const grayScaleConverter = new GrayScaleConverter();

//https://github.com/simon987/imagehash-web/blob/main/lib/dhash.js
async function dhash(image, size = 8) {

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(image, size + 1, size));

    const hash = new Uint8ClampedArray(size * size);
    const nRows = size;
    const nCols = size + 1;

    let offset = 0;
    for (let i = 0; i < nRows; i++) {
        for (let j = 1; j < nCols; j++) {
            hash[offset++] = pixels[i * nCols + j] > pixels[i * nCols + j - 1];
        }
    }

    return new ImageHash(hash);
}
//https://github.com/simon987/imagehash-web/blob/main/lib/ahash.js
async function ahash(image, size = 8) {
    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(image, size, size));

    const hash = new Uint8ClampedArray(size * size);

    let sum = 0;
    for (let i = 0; i < pixels.length; i++) {
        sum += pixels[i];
    }
    const avg = sum / pixels.length;

    for (let i = 0; i < pixels.length; i++) {
        hash[i] = pixels[i] > avg;
    }

    return new ImageHash(hash);
}  

//https://github.com/simon987/imagehash-web/blob/main/lib/phash.js
const cosCache = {};

function precomputeCos(L) {
    if (L in cosCache) {
        return cosCache[L];
    }

    const piOver2L = Math.PI / (2 * L)

    const cos = {};

    for (let u = 0; u < L; u++) {
        const uTimesPiOver2L = u * piOver2L;
        for (let x = 0; x < L; x++) {
            cos[(u << 8) + x] = Math.cos((2 * x + 1) * uTimesPiOver2L);
        }
    }

    cosCache[L] = cos;

    return cos;
}

/**
 * 2D DCT-II
 * @param matrix Must be a square matrix
 * @return {Array}
 */
function dctTransform(matrix) {

    const L = Math.round(Math.sqrt(matrix.length));

    const cos = precomputeCos(L);
    const dct = new Array(L * L);

    let _u, _v, sum;

    for (let u = 0; u < L; u++) {
        for (let v = 0; v < L; v++) {
            sum = 0;

            _u = u << 8;
            _v = v << 8;

            for (let x = 0; x < L; x++) {
                for (let y = 0; y < L; y++) {
                    sum += matrix[x * L + y] * cos[_u + x] * cos[_v + y];
                }
            }

            dct[u * L + v] = sum;
        }
    }

    return dct
}


function median(values) {
    values.sort((a, b) => a - b);
    return values[Math.floor(values.length / 2)];
}

/**
 * @param image {Image}
 * @param size {number}
 * @param highFrequencyFactor {number}
 */
async function phash(image, size = 8, highFrequencyFactor = 4) {
    const imageSize = size * highFrequencyFactor;

    const pixels = grayScaleConverter.convert(await canvasUtil.resizeImageAndGetData(image, imageSize, imageSize));

    const dctOut = dctTransform(pixels);

    const dctLowFreq = new Float64Array(size * size)
    const sorted = new Float64Array(size * size)

    let ptrLow = 0;
    let ptr = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            dctLowFreq[ptrLow] = dctOut[ptr];
            sorted[ptrLow] = dctOut[ptr];
            ptrLow += 1;
            ptr += 1;
        }
        ptr += imageSize - size;
    }

    let sum = 0;
    for (let i = 0; i < dctLowFreq.length; i++) {
        sum += dctLowFreq[i];
    }
    const med = median(sorted);

    const hash = new Uint8ClampedArray(size * size);

    for (let i = 0; i < hash.length; ++i) {
        hash[i] = dctLowFreq[i] > med;
    }

    return new ImageHash(hash);
}



//----start

let videoScale = 0.25;
let hashLength= 16;
let hashKind = 'dhash';//TODO: swap alg

let hashFunc = dhash;

//---custom logic here
async function processFrame(frame){
			  //--process
		  
	const options = {
		resizeWidth: frame.codedWidth * videoScale,
		resizeHeight: frame.codedHeight * videoScale
	};
	const bitmap = await createImageBitmap(frame, options);
	const tempCanvas = new OffscreenCanvas(options.resizeWidth,options.resizeHeight);
	tempCanvas.getContext('2d').drawImage(bitmap, 0, 0);
	
	//NOTE only p/a/d/hash implemented above
	const hash = await dhash(tempCanvas, hashLength); //phash() dhash() ahash() [doesn't work:cropResistantHash] [doesn't work:whash]
	sendMessage('hash',{
		timestamp:frame.timestamp,
		hash:hash.toHexString()
	});
	
}

