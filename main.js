class calculator{
    constructor(prebtn, curbtn){
        this.prebtn = prebtn
        this.curbtn = curbtn
        this.clear();
    }
    clear(){
        this.curbtnand = '';
        this.prebtnand = '';
        this.operation = undefined;
    }
    delete(){
        this.curbtnand= this.curbtnand.toString().slice(0,-1)
    }
    appendNumber(number){
        if(number === '.' && this.curbtnand.includes('.'))return
        this.curbtnand = this.curbtnand.toString() + number.toString();
       
    }
    choosOperation(operation){
        if(this.curbtnand === '')return
        if(this.prebtnand !== ''){
            this.compute();
        }
      this.operation = operation;
      this.prebtnand = this.curbtnand;
      this.curbtnand = '';
    }
    getdisplay(number){
        return number;
    }
    updateDisplay(){
        this.curbtn.innerText = this.getdisplay(this.curbtnand);
        if(this.operation != null){
            this.prebtn.innerText = 
            `${this.getdisplay(this.prebtnand)} ${this.getdisplay(this.operation)}`;
        }else{
            this.prebtn.innerText = '';
        }
      
    }
    compute(){
        let computation;
        const prev = parseFloat(this.prebtnand);
        const current = parseFloat(this.curbtnand);
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
            computation = prev + current
            break;
            case '-':
            computation = prev - current
            break;
            case '*':
            computation = prev * current
            break;
            case '/':
            computation = prev / current
            break;
            default:
            return;
      }
      this.curbtnand = computation;
      this.operation = undefined;
      this.prebtnand = '';
    }
    }


const numberbtn = document.querySelectorAll('[data-number]');
const prebtn = document.querySelector('[data-previous-operand]')
const curbtn = document.querySelector('[data-current-operand]')
const operationbtn = document.querySelectorAll('[data-operation]')
const equalbtn = document.querySelector('[data-equals]')
const deletebtn = document.querySelector('[data-delete]')
const clearbtn = document.querySelector('[data-all-clear]')


const Calculator = new calculator(prebtn, curbtn) 
numberbtn.forEach(button => {
    button.addEventListener('click', () => {
        
        Calculator.appendNumber(button.innerText);
        Calculator.updateDisplay();
    })
})

operationbtn.forEach(button => {
    button.addEventListener('click', () => {
        Calculator.choosOperation(button.innerText);
        Calculator.updateDisplay();
    })
})

equalbtn.addEventListener('click', button => {
    Calculator.compute();
    Calculator.updateDisplay();
})
clearbtn.addEventListener('click', button => {
    Calculator.clear();
    Calculator.updateDisplay();
})

deletebtn.addEventListener('click', button => {
    Calculator.delete();
    Calculator.updateDisplay();
})






