const analyseButtonId = "analyseButton";
const inputTextId = "input";
const outputAgeId = "outputAge";
const outputGenderId = "outputGender";
const outputDivId = "output";
const errorDivId = "error";
const imageId = "image";

const apiKey = "005cbde8401849c6b0af20ec0bbbab51";
const apiBaseUrl = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0";

function setImage(imageUrl) {
    const image = document.getElementById(imageId);
    image.src = imageUrl;
}

function cleanOutputDiv() {
    const outputDiv = getOutputDiv();
    outputDiv.innerHTML = "";
}

function getOutputDiv() {
    return document.getElementById(outputDivId);
}

function createSpan(textContent, classList) {
    const span = document.createElement("span");
    span.classList.add(classList);
    span.textContent = textContent;
    return span;
}

function createOutputs({ age, gender }) {
    const ageTextContainer = document.createElement("div");
    ageTextContainer.classList.add("outputTextContainer");

    const ageLabelSpan = createSpan("Age:", "outputLabel");
    const ageSpan = createSpan(age, "outputText");

    const genderTextContainer = document.createElement("div");
    genderTextContainer.classList.add("outputTextContainer");

    const genderLabelSpan = createSpan("Gender:", "outputLabel");
    const genderSpan = createSpan(gender, "outputText");

    ageTextContainer.appendChild(ageLabelSpan);
    ageTextContainer.appendChild(ageSpan);

    genderTextContainer.appendChild(genderLabelSpan);
    genderTextContainer.appendChild(genderSpan);

    const outputDiv = getOutputDiv();
    outputDiv.appendChild(ageTextContainer);
    outputDiv.appendChild(genderTextContainer);
}

function createError() {
    const errorContainer = document.createElement("div");
    errorContainer.id = "error";

    const errorSpan = createSpan("No Face Detected", "error");
    errorContainer.appendChild(errorSpan);

    const outputDiv = getOutputDiv();
    outputDiv.appendChild(errorContainer);
}

function analyze() {
    const reqBody = {
        url: document.getElementById(inputTextId).value
    };
    const reqHeader = new Headers({
        "Content-Type": "application/json",
        "Ocp-Apim-Subscription-Key": apiKey
    });

    const reqObject = {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: reqHeader
    };

    cleanOutputDiv();

    const request = new Request(`${apiBaseUrl}/detect?returnFaceAttributes=age,gender`, reqObject);

    fetch(request).then(response => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(response.statusText));
    }).then(data => {
        setImage(reqBody.url);
        if (data.length == 0) {
            alert("No faces detected");
            createError();
        } else {
            const face = data[0];
            createOutputs(face.faceAttributes);
        }
    }).catch(error => {
        setImage("");
        alert(error);
        console.error(error);
    });
}

document.getElementById(analyseButtonId).addEventListener("click", analyze);