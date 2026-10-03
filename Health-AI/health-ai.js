/* =================================
   ANIMORA HEALTH AI
   JAVASCRIPT
================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("Animora Health AI loaded successfully.");

});


/* =================================
   IMAGE PREVIEW
================================= */

function previewImage(event) {

    const image = document.getElementById("imagePreview");

    if (!image) {
        return;
    }

    const file = event.target.files[0];

    if (file) {

        const reader = new FileReader();

        reader.onload = function (e) {

            image.src = e.target.result;

            image.style.display = "block";

        };

        reader.readAsDataURL(file);
    }
}


/* =================================
   HEALTH SCAN
================================= */

function runHealthScan() {

    const result = document.getElementById("scanResult");

    if (!result) {
        return;
    }

    result.style.display = "block";

    result.innerHTML = `
        <h3>🔎 Health Scan Result</h3>

        <p>
            The uploaded image has been processed
            by the demonstration interface.
        </p>

        <br>

        <strong>Possible Observation:</strong>

        <p>
            Mild skin redness or irritation may be
            visible in the selected area.
        </p>

        <br>

        <strong>Recommendation:</strong>

        <p>
            Monitor the area and consult a veterinarian
            if the condition continues or becomes worse.
        </p>
    `;

}


/* =================================
   SYMPTOM CHECKER
================================= */

function checkSymptoms() {

    const selectedSymptoms =
        document.querySelectorAll(
            ".symptom-option input:checked"
        );

    const result =
        document.getElementById("symptomResult");

    if (!result) {
        return;
    }

    if (selectedSymptoms.length === 0) {

        result.style.display = "block";

        result.innerHTML = `
            <h3>⚠️ Select a symptom</h3>

            <p>
                Please select at least one symptom
                to explore possible health areas.
            </p>
        `;

        return;
    }


    let symptoms = [];

    selectedSymptoms.forEach(function (item) {

        symptoms.push(item.value);

    });


    result.style.display = "block";

    result.innerHTML = `
        <h3>🩺 Health Information</h3>

        <p>
            You selected:
            <strong>${symptoms.join(", ")}</strong>
        </p>

        <br>

        <p>
            These symptoms may have different causes,
            including digestive, skin, respiratory,
            nutritional, or general wellness issues.
        </p>

        <br>

        <p>
            If symptoms continue, become severe,
            or your pet behaves unusually,
            consult a veterinarian.
        </p>
    `;
}


/* =================================
   PRINT REPORT
================================= */

function printReport() {

    window.print();

}