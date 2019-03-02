
function test(divID: string, output: string) {
    const element = document.getElementById(divID);
    element.innerText = output;
}

test("test", "Output: Test");