function and(a, b) {
    if (a === 1 && b === 1) {
        return 1;
    } else {
        return 0;
    }
}

function or(a, b) {
    if (a === 1 || b === 1) {
        return 1;
    } else {
        return 0;
    }
}

function not(a) {
    if (a === 1) {
        return 0;
    } else {
        return 1;
    }
}

function halfAdder(a, b) {
    const or_a = or(a, b);
    const not_b = not(and(a, b));
    const out_s = and(or_a, not_b);
    const out_c = and(a, b);
    return { s: out_s, c: out_c };
}

function fullAdder(a, b, x) {
    const halfAdder1 = halfAdder(a, b);
    const halfAdder2 = halfAdder(halfAdder1.s, x);
    const or_a = halfAdder2.c;
    const or_b = halfAdder1.c;
    const out_s = halfAdder2.s;
    const out_c = or(or_a, or_b);
    return { s: out_s, c: out_c };
}

// 論理回路はここまで

function countDgt(arr1, arr2) {
    if (arr1.length > arr2.length) {
        return arr1.length;
    } else {
        return arr2.length;
    }
}

function usefulMainLogic(arr1, arr2) {
    const len = countDgt(arr1, arr2);
    const num1 = arr1.reverse(); //1桁目から計算するので配列を逆に並び替え
    const num2 = arr2.reverse();
    const res = [];
    let a = 0;
    let c = 0;
    for (let i = 0; i < len; i++) {
        a = fullAdder(num1[i], num2[i], c).s;
        res.push(a);
        c = fullAdder(num1[i], num2[i], c).c;
    }
    res.push(c); //最後の桁上がり（繰り上がり）
    return res.reverse(); //並び替えていた配列をもとに戻す
}

function splitToArr(num) {
    const str = String(num);
    const arr = str.split("");
    const res = [];
    for (let i = 0; i < arr.length; i++) {
        res.push(Number(arr[i]));
    }
    return res;
}

function preparation(num1, num2) {
    const arr1 = splitToArr(num1);
    const arr2 = splitToArr(num2);
    return [arr1, arr2];
}

function addition(a, b) {
    const arr = preparation(a, b); //データの下準備
    const res = usefulMainLogic(arr[0], arr[1]); //論理回路へ渡す
    console.log(res); //実行結果
}

addition(101, 1011); //例

//https://www.youtube.com/watch?v=cfn0xkIFceY&t=1303s
