/**
 * sorting.js
 * Author: Kevin Reese
 * 
 * Program to visualize various sorting algorithms (Bubble Sort, Quick Sort, Insertion Sort, and Heap Sort) using bars.
 * Allows users to select an algorithm, adjust speed, and generate new random arrays to visualize the sorting processes.
 */
let bars_container = document.getElementById('bars-container');
let run_btn = document.getElementById('run-btn');
let randomize_btn = document.getElementById('randomize-btn');
let speed_slider = document.getElementById('speed-slider');
let speed_value = document.getElementById('speed-value');
let alg_select = document.getElementById('alg-select');
let random_array = [];
let speed_factor = 5;

const height_factor = 4;


document.addEventListener('DOMContentLoaded', function() {
    random_array = (alg_select.value == "quick" || alg_select.value == "heap") ? getRandomArray(160) : getRandomArray(100);
    renderBars();
});

run_btn.addEventListener('click', async function() {
    const algSelected = alg_select.value;
    if (algSelected == "bubble") {
        await bubbleSort(random_array);
    } else if (algSelected == "quick") {
        await quickSort(random_array, 0, random_array.length - 1);
    } else if (algSelected == "insert") {
        await insertionSort(random_array);
    } else if (algSelected == "heap") {
        await heapSort(random_array);
    }
});

randomize_btn.addEventListener('click', function() {
    random_array = (alg_select.value == "quick" || alg_select.value == "heap") ? getRandomArray(160) : getRandomArray(100);
    renderBars();
});

alg_select.addEventListener('change', function() {
    random_array = (alg_select.value == "quick" || alg_select.value == "heap") ? getRandomArray(160) : getRandomArray(100);
    renderBars();
})

speed_slider.addEventListener('input', function() {
    speed_factor = speed_slider.value;
    speed_value.innerHTML = speed_slider.value;
})

async function renderBars() {
    bars_container.innerHTML = '';
    for (let i = 0; i < random_array.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.id = 'bar' + i;
        bar.style.height = random_array[i] * height_factor + 'px';
        bars_container.appendChild(bar);
    }
}

function getRandomArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr[i] = Math.floor(Math.random() * 100) + 1;
    }
    return arr;
}

function sleep(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}


/**
 *  ******************************* SORTING ALGORITHMS **************************
 */


/**
 * Bubble sort - Avg: O(n^2)  Worst: O(n^2)
 * 
 * @param {number[]} arr - Array to be sorted using bubble sort.
 */
async function bubbleSort(arr) {
    let bars = document.getElementsByClassName('bar');
    for (let i = 0; i < arr.length; i++) {
        let swapped = false;
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swapped = true;

                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;

                bars[j].style.height = arr[j] * height_factor + 'px';
                bars[j].style.backgroundColor = '#ff4d6d';
    
                bars[j + 1].style.height = arr[j + 1] * height_factor + 'px';
                bars[j + 1].style.backgroundColor = '#ff4d6d';
                await sleep(speed_factor);

                bars[j].style.backgroundColor = '#bcffd9';
                bars[j + 1].style.backgroundColor = '#bcffd9';
            }
        }
        if (!swapped) break;
    }
}

/**
 * Quick sort - Avg: O(nlogn)  Worst: O(n^2)
 * 
 * @param {number[]} arr - Array to be sorted using quick sort.
 */
async function quickSort(arr, start, end) {
    let bars = document.getElementsByClassName('bars');
    if (start < end) {
        let idx = await partition(arr, start, end);
        await quickSort(arr, start, idx - 1);
        await quickSort(arr, idx + 1, end);
    }

    for (let i = 0; i < bars.length; i++) {
        bars[i].style.backgroundColor = '#bcffd9';
    }
}

async function partition(arr, start, end) {
    let bars = document.getElementsByClassName('bar');
    let pivot = arr[end];
    let i = start - 1;

    bars[end].style.backgroundColor = 'cyan';
    await sleep(speed_factor);

    for (let j = start; j < end; j++) {
        if (arr[j] < pivot) {
            i++;
            let temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;

            bars[i].style.backgroundColor = '#ff4d6d';
            bars[j].style.backgroundColor = '#ff4d6d';
            bars[i].style.height = arr[i] * height_factor + 'px';
            bars[j].style.height = arr[j] * height_factor + 'px';
            await sleep(speed_factor);

            bars[i].style.backgroundColor = '#bcffd9';
            bars[j].style.backgroundColor = '#bcffd9';
        }
    }

    let temp = arr[i + 1];
    arr[i + 1] = arr[end];
    arr[end] = temp;

    bars[i + 1].style.backgroundColor = 'cyan';
    bars[end].style.backgroundColor = '#bcffd9';
    bars[i + 1].style.height = arr[i + 1] * height_factor + 'px';
    bars[end].style.height = arr[end] * height_factor + 'px';
    await sleep(speed_factor);

    bars[i + 1].style.backgroundColor = '#bcffd9';
    await sleep(speed_factor);

    return i + 1;
}


/**
 * Insertion sort - Avg: O(n^2)  Worst: O(n^2)
 * 
 * @param {number[]} arr - Array to be sorted using insertion sort.
 */
async function insertionSort(arr) {
    let bars = document.getElementsByClassName('bar');

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            bars[j + 1].style.height = arr[j + 1] * height_factor + 'px';
            bars[j + 1].style.backgroundColor = '#ff4d6d';
            await sleep(speed_factor);

            for (let k = 0; k < bars.length; k++) {
                if (k != j + 1) bars[k].style.backgroundColor = '#bcffd9';
            }
            j--;
        }

        arr[j + 1] = key;
        bars[j + 1].style.height = arr[j + 1] * height_factor + 'px';
        bars[j + 1].style.backgroundColor = '#abec28';
        await sleep(speed_factor);
    }

    for (let k = 0; k < bars.length; k++) {
        bars[k].style.backgroundColor = '#bcffd9';
    }
    await sleep(speed_factor);
}

/**
 * Heap sort - Avg: O(nlogn)  Worst: O(nlogn)
 * 
 * @param {number[]} arr - Array to be sorted using heap sort.
 */
async function heapSort(arr) {
    let bars = document.getElementsByClassName('bar');

    for (let i = arr.length / 2 - 1; i >= 0; i--) 
        await heapify(arr, arr.length, i);

    for (let i = arr.length - 1; i > 0; i--) {
        await swap(arr, i, 0);
        bars[i].style.backgroundColor = '#bcffd9';
        await heapify(arr, i, 0);
    }

    for (let i = 0; i < arr.length; i++)
        bars[i].style.backgroundColor = '#bcffd9';
}

async function heapify(arr, n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && arr[l] > arr[largest]) largest = l;
    if (r < n && arr[r] > arr[largest]) largest = r;

    if (largest != i) {
        await swap(arr, i, largest);
        await heapify(arr, n, largest);
    }
}

async function swap(arr, i, j) {
    let bars = document.getElementsByClassName('bar');

    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp

    bars[i].style.height = arr[i] * height_factor + 'px';
    bars[j].style.height = arr[j] * height_factor + 'px';
    bars[i].style.backgroundColor = '#ff4d6d';
    bars[j].style.backgroundColor = '#ff4d6d';
    await sleep(speed_factor);

}


