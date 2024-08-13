window.onload = function() {
    disableExpDateField();
    panFontSize();
    checkErrors();

    let panInput = document.querySelector("#pan");
    let panInputWrapper = document.querySelector(".pan-block .wrapper-input")
    let expDateBlock = document.querySelector(".inline");
    let expMonth = document.querySelector("#expMonth");
    let expYear = document.querySelector("#expYear");
    let cvvInput = document.querySelector("#cvv2");
    let cvvInputWrapper = document.querySelector(".cvv2-block .wrapper-input");

    panInput.addEventListener('input', () => {
        {
            var selectionStart = panInput.selectionStart;
            panInput.value = panInput.value.substring(0, selectionStart) + panInput.value.substring(selectionStart + 1);
            panInput.setSelectionRange(selectionStart, selectionStart);
        }
    });

    panInput.addEventListener("input", () => {
        panInputWrapper.style.border = "1px solid #0086FF";
        panInputWrapper.style.boxShadow = "none";
    })

    panInput.addEventListener("focus", () => {
        panInputWrapper.style.border = "1px solid #CCCCCC";
        panInputWrapper.style.boxShadow = "0 0 0 4px #8FCDEF";
    })

    panInput.addEventListener("blur", () => {
        panInputWrapper.style.boxShadow = "none";
        panInputWrapper.style.border = "1px solid #CCCCCC";
    })

    expMonth.addEventListener("input", () => {
        expDateBlock.style.border = "1px solid #0086FF";
        expDateBlock.style.boxShadow = "none";
    })

    expMonth.addEventListener("focus", () => {
        expDateBlock.style.border = "1px solid #CCCCCC";
        expDateBlock.style.boxShadow = "0 0 0 4px #8FCDEF";
    })

    expMonth.addEventListener("blur", () => {
        expDateBlock.style.boxShadow = "none";
    })

    expYear.addEventListener("input", () => {
        expDateBlock.style.border = "1px solid #0086FF";
        expDateBlock.style.boxShadow = "none";
    })

    expYear.addEventListener("focus", () => {
        expDateBlock.style.border = "1px solid #CCCCCC";
        expDateBlock.style.boxShadow = "0 0 0 4px #8FCDEF";
    })

    expYear.addEventListener("blur", () => {
        expDateBlock.style.boxShadow = "none";
        expDateBlock.style.border = "1px solid #CCCCCC";
    })

    cvvInput.addEventListener("input", () => {
        cvvInputWrapper.style.border = "1px solid #0086FF";
        cvvInputWrapper.style.boxShadow = "none";
    })

    cvvInput.addEventListener("focus", () => {
        cvvInputWrapper.style.border = "1px solid #CCCCCC";
        cvvInputWrapper.style.boxShadow = "0 0 0 4px #8FCDEF";
    })

    cvvInput.addEventListener("blur", () => {
        cvvInputWrapper.style.boxShadow = "none";
        cvvInputWrapper.style.border = "1px solid #CCCCCC";
    })
};

function adjustViewportHeight() {
    document.documentElement.style.setProperty('--viewport-height', `${window.innerHeight}px`);
}

adjustViewportHeight();

window.addEventListener('orientationchange', adjustViewportHeight);

function checkMaxLength(elem, event){

    let ml = elem.getAttribute('maxlength');
    let inputs = document.querySelectorAll('input');
    
    for (let i = 0; i < inputs.length - 2; i++ ) {
        if (elem == inputs[i]) {
            if(ml && elem.value.length >= ml && event.keyCode != '37' && event.keyCode != '39') {
                elem = inputs[i + 1];
            }
            elem.focus();
        }
    }
}

function panMask(event, elem) {

    elem.value = elem.value.replace(/[^0-9]/g, '').replace(/(\..*?)\..*/g, '$1');

    let cardNumber = event.target.value.replace(/\s/g, '');
    let formattedCardNumber = cardNumber.slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');
    formattedCardNumber += cardNumber.slice(16);
    event.target.value = formattedCardNumber;

    if (window.screen.availWidth > 480) {
        if (elem.value.length > 19) {
            elem.style.fontSize = "32px";
        } else if (elem.value.length <= 19) {
            elem.style.fontSize = "38px";
        }
    } else {
        if (elem.value.length > 19) {
            elem.style.fontSize = "16px";
        } else if (elem.value.length <= 19) {
            elem.style.fontSize = "20px";
        }
    }
}

function panFontSize() {
    let panInput = document.getElementById("pan");
    if (window.screen.availWidth > 480) {
        if (panInput.value.length > 19) {
            panInput.style.fontSize = "32px";
        } else if (panInput.value.length <= 19) {
            panInput.style.fontSize = "38px";
        }
    } else {
        if (panInput.value.length > 19) {
            panInput.style.fontSize = "16px";
        } else if (panInput.value.length <= 19) {
            panInput.style.fontSize = "20px";
        }
    }
}

function pressEnter(event, elem) {
    let inputs = document.querySelectorAll('input');
    if(event.keyCode === 13) {
        for (let i = 0; i < inputs.length - 1; i++ ) {
            if (elem == inputs[i]) {
                event.preventDefault();
                elem = inputs[i + 1];
                elem.focus();
                break;
            }
        }
    }
}

function checkErrors() {
    let panInput = document.querySelector("#pan");
    let panInputWrapper = document.querySelector(".pan-block .wrapper-input")
    let expDateBlock = document.querySelector(".inline");
    let cvvInput = document.querySelector("#cvv2");
    let cvvInputWrapper = document.querySelector(".cvv2-block .wrapper-input");
    let expMonth = document.querySelector("#expMonth");

    let inputs = [ panInputWrapper, expDateBlock, cvvInputWrapper ];

    let errors = document.querySelectorAll(".group-error");
    
    for (let i = 0; i < errors.length; i++) {
        if (errors[i].innerHTML != '') {
            inputs[i].style.border = "2px solid red";
            inputs[i].style.boxShadow = "none";
        }
    }

    for (let i = errors.length - 1; i >= 0; i--) {
        if (errors[i].innerHTML != '') { 
            if (i == 1) {
                expMonth.focus();
            } else if (i == 0) {
                panInput.focus();
            } else {
                cvvInput.focus();
            }
        }
    }
}

function disableExpDateField() {
    let inline = document.getElementById('inline');
    let expMonth = document.getElementById('expMonth');
    let expYear = document.getElementById('expYear');
    if (expMonth.disabled || expYear.disabled) {
        inline.style.backgroundColor = "#F0F0F0";
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode > 31 && (charCode < 48 || charCode > 57));
  }
