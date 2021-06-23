const printWords = (words, time, i = 0) => {
    if(i >= words.length) return;
 
    console.log(words[i]);
    setTimeout(() => printWords(words, time, i+1), time);
};
 
const printSlow = (text, time) => {
    const words = text.split(" ");
    printWords(words, time);
};

printSlow("Lorem ipsum dolor sit amet,",1000)
printSlow("sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",2000)


words.map((el, i) => [i*waitTime, el])
   .forEach((waitElement) => {
    const [waitTime, el] = waitElement;
    setTimeout(() => console.log(el), waitTime);
 });