const FLAG1 = 0b0001;  // 0x1, new contact flag
const FLAG2 = 0b0010;  // 0x2
const FLAG3 = 0b0100;  // 0x4
const FLAG4 = 0b1000;  // 0x8

function isFlag1Set(flag) {
    return (flag & FLAG1) !== 0;
}

function isFlag2Set(flag) {
    return (flag & FLAG2) !== 0;
}

function isFlag3Set(flag) {
    return (flag & FLAG3) !== 0;
}

function isFlag4Set(flag) {
    return (flag & FLAG4) !== 0;
}

export { FLAG1, FLAG2, FLAG3, FLAG4, isFlag1Set, isFlag2Set, isFlag3Set, isFlag4Set }