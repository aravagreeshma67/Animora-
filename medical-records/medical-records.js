/* =====================================================
   ANIMORA - MEDICAL RECORDS
===================================================== */


/* =====================================================
   PROFILE PHOTO
===================================================== */

const profilePhotoInput =
    document.getElementById("profilePhotoInput");

const profilePhotoPreview =
    document.getElementById("profilePhotoPreview");

const photoPlaceholder =
    document.getElementById("photoPlaceholder");


if (profilePhotoInput) {

    profilePhotoInput.addEventListener(
        "change",
        function () {

            const file = this.files[0];

            if (!file) {
                return;
            }

            if (!file.type.startsWith("image/")) {

                alert("Please select an image file.");

                return;
            }

            const imageURL =
                URL.createObjectURL(file);

            profilePhotoPreview.src =
                imageURL;

            profilePhotoPreview.style.display =
                "block";

            if (photoPlaceholder) {

                photoPlaceholder.style.display =
                    "none";
            }

        }
    );
}


/* =====================================================
   SAVE ANIMAL PROFILE
===================================================== */

function saveProfile() {

    const animalName =
        document.getElementById("animalName").value.trim();

    const species =
        document.getElementById("species").value;

    const breed =
        document.getElementById("breed").value.trim();

    const dob =
        document.getElementById("dob").value;

    const gender =
        document.getElementById("gender").value;

    const weight =
        document.getElementById("weight").value;

    const notes =
        document.getElementById("notes").value.trim();


    if (!animalName || !species) {

        alert(
            "Please enter the animal name and species."
        );

        return;
    }


    const profile = {

        animalName: animalName,

        species: species,

        breed: breed,

        dob: dob,

        gender: gender,

        weight: weight,

        notes: notes

    };


    localStorage.setItem(
        "animoraAnimalProfile",
        JSON.stringify(profile)
    );


    alert(
        "Animal profile saved successfully!"
    );
}


/* =====================================================
   LOAD SAVED PROFILE
===================================================== */

function loadProfile() {

    const savedProfile =
        localStorage.getItem(
            "animoraAnimalProfile"
        );


    if (!savedProfile) {
        return;
    }


    const profile =
        JSON.parse(savedProfile);


    const animalName =
        document.getElementById("animalName");

    const species =
        document.getElementById("species");

    const breed =
        document.getElementById("breed");

    const dob =
        document.getElementById("dob");

    const gender =
        document.getElementById("gender");

    const weight =
        document.getElementById("weight");

    const notes =
        document.getElementById("notes");


    if (animalName) {
        animalName.value =
            profile.animalName || "";
    }


    if (species) {
        species.value =
            profile.species || "";
    }


    if (breed) {
        breed.value =
            profile.breed || "";
    }


    if (dob) {
        dob.value =
            profile.dob || "";
    }


    if (gender) {
        gender.value =
            profile.gender || "";
    }


    if (weight) {
        weight.value =
            profile.weight || "";
    }


    if (notes) {
        notes.value =
            profile.notes || "";
    }

}


/* =====================================================
   VACCINATION RECORDS
===================================================== */

function getVaccinations() {

    const savedVaccinations =
        localStorage.getItem(
            "animoraVaccinations"
        );


    if (!savedVaccinations) {
        return [];
    }


    return JSON.parse(savedVaccinations);
}


/* ================= ADD VACCINATION ================= */

function addVaccination() {

    const vaccineName =
        document.getElementById("vaccineName").value.trim();

    const dateGiven =
        document.getElementById("dateGiven").value;

    const nextDue =
        document.getElementById("nextDue").value;

    const veterinarian =
        document.getElementById("veterinarian").value.trim();

    const notes =
        document.getElementById("vaccinationNotes").value.trim();


    if (!vaccineName || !dateGiven) {

        alert(
            "Please enter the vaccine name and date."
        );

        return;
    }


    const vaccinations =
        getVaccinations();


    const vaccination = {

        id: Date.now(),

        vaccineName: vaccineName,

        dateGiven: dateGiven,

        nextDue: nextDue,

        veterinarian: veterinarian,

        notes: notes

    };


    vaccinations.push(vaccination);


    localStorage.setItem(
        "animoraVaccinations",
        JSON.stringify(vaccinations)
    );


    document.getElementById(
        "vaccinationForm"
    ).reset();


    displayVaccinations();


    alert(
        "Vaccination record added successfully!"
    );
}


/* ================= DISPLAY VACCINATIONS ================= */

function displayVaccinations() {

    const vaccinationList =
        document.getElementById("vaccinationList");


    if (!vaccinationList) {
        return;
    }


    const vaccinations =
        getVaccinations();


    if (vaccinations.length === 0) {

        vaccinationList.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    💉
                </div>

                <p>
                    No vaccination records yet.
                </p>

            </div>

        `;

        return;
    }


    vaccinationList.innerHTML =
        vaccinations.map(function (record) {

            return `

                <div class="record-item">

                    <div class="record-main">

                        <h3>
                            ${escapeHTML(record.vaccineName)}
                        </h3>

                        <p>
                            Veterinarian:
                            ${escapeHTML(
                                record.veterinarian || "Not provided"
                            )}
                        </p>

                        ${
                            record.notes
                            ?
                            `<p>
                                Notes:
                                ${escapeHTML(record.notes)}
                            </p>`
                            :
                            ""
                        }

                        <span class="status">
                            Vaccinated
                        </span>

                    </div>


                    <div class="record-date">

                        <span>
                            Date Given
                        </span>

                        <strong>
                            ${formatDate(record.dateGiven)}
                        </strong>


                        ${
                            record.nextDue
                            ?
                            `
                            <span>
                                Next Due
                            </span>

                            <strong>
                                ${formatDate(record.nextDue)}
                            </strong>
                            `
                            :
                            ""
                        }

                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
   MEDICAL HISTORY
===================================================== */

function getHistory() {

    const savedHistory =
        localStorage.getItem(
            "animoraMedicalHistory"
        );


    if (!savedHistory) {
        return [];
    }


    return JSON.parse(savedHistory);
}


/* ================= ADD HISTORY ================= */

function addHistory() {

    const condition =
        document.getElementById("condition").value.trim();

    const historyDate =
        document.getElementById("historyDate").value;

    const symptoms =
        document.getElementById("symptoms").value.trim();

    const treatment =
        document.getElementById("treatment").value.trim();

    const veterinarian =
        document
            .getElementById("historyVeterinarian")
            .value.trim();

    const notes =
        document
            .getElementById("historyNotes")
            .value.trim();


    if (!condition || !historyDate) {

        alert(
            "Please enter the condition and date."
        );

        return;
    }


    const history =
        getHistory();


    const record = {

        id: Date.now(),

        condition: condition,

        historyDate: historyDate,

        symptoms: symptoms,

        treatment: treatment,

        veterinarian: veterinarian,

        notes: notes

    };


    history.push(record);


    localStorage.setItem(
        "animoraMedicalHistory",
        JSON.stringify(history)
    );


    document.getElementById(
        "historyForm"
    ).reset();


    displayHistory();


    alert(
        "Medical record added successfully!"
    );
}


/* ================= DISPLAY HISTORY ================= */

function displayHistory() {

    const historyList =
        document.getElementById("historyList");


    if (!historyList) {
        return;
    }


    const history =
        getHistory();


    if (history.length === 0) {

        historyList.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    🩺
                </div>

                <p>
                    No medical history records yet.
                </p>

            </div>

        `;

        return;
    }


    historyList.innerHTML =
        history.map(function (record) {

            return `

                <div class="record-item">

                    <div class="record-main">

                        <h3>
                            ${escapeHTML(record.condition)}
                        </h3>

                        ${
                            record.symptoms
                            ?
                            `<p>
                                Symptoms:
                                ${escapeHTML(record.symptoms)}
                            </p>`
                            :
                            ""
                        }

                        ${
                            record.treatment
                            ?
                            `<p>
                                Treatment:
                                ${escapeHTML(record.treatment)}
                            </p>`
                            :
                            ""
                        }

                        <p>
                            Veterinarian:
                            ${escapeHTML(
                                record.veterinarian || "Not provided"
                            )}
                        </p>

                        ${
                            record.notes
                            ?
                            `<p>
                                Notes:
                                ${escapeHTML(record.notes)}
                            </p>`
                            :
                            ""
                        }

                    </div>


                    <div class="record-date">

                        <span>
                            Date
                        </span>

                        <strong>
                            ${formatDate(record.historyDate)}
                        </strong>

                    </div>

                </div>

            `;

        }).join("");

}


/* =====================================================
   DOCUMENTS
===================================================== */

function getDocuments() {

    const savedDocuments =
        localStorage.getItem(
            "animoraDocuments"
        );


    if (!savedDocuments) {
        return [];
    }


    return JSON.parse(savedDocuments);
}


/* ================= DOCUMENT INPUT ================= */

const documentInput =
    document.getElementById("documentInput");


if (documentInput) {

    documentInput.addEventListener(
        "change",
        function () {

            const file =
                this.files[0];


            if (!file) {
                return;
            }


            const documents =
                getDocuments();


            const documentRecord = {

                id: Date.now(),

                name: file.name,

                size: file.size,

                type: file.type

            };


            documents.push(
                documentRecord
            );


            localStorage.setItem(
                "animoraDocuments",
                JSON.stringify(documents)
            );


            displayDocuments();


            this.value = "";


            alert(
                "Document added successfully!"
            );

        }
    );

}


/* ================= DISPLAY DOCUMENTS ================= */

function displayDocuments() {

    const documentList =
        document.getElementById("documentList");


    if (!documentList) {
        return;
    }


    const documents =
        getDocuments();


    if (documents.length === 0) {

        documentList.innerHTML = `

            <div class="empty-state">

                <div class="empty-state-icon">
                    📁
                </div>

                <p>
                    No medical documents uploaded yet.
                </p>

            </div>

        `;

        return;
    }


    documentList.innerHTML =
        documents.map(function (document) {

            return `

                <div class="document-item">

                    <div class="document-info">

                        <div class="document-icon">
                            📄
                        </div>


                        <div>

                            <strong>
                                ${escapeHTML(document.name)}
                            </strong>

                            <span>
                                ${formatFileSize(document.size)}
                            </span>

                        </div>

                    </div>


                    <button
                        type="button"
                        class="delete-button"
                        onclick="deleteDocument(${document.id})"
                    >
                        Delete
                    </button>

                </div>

            `;

        }).join("");

}


/* ================= DELETE DOCUMENT ================= */

function deleteDocument(id) {

    const documents =
        getDocuments();


    const updatedDocuments =
        documents.filter(function (document) {

            return document.id !== id;

        });


    localStorage.setItem(
        "animoraDocuments",
        JSON.stringify(updatedDocuments)
    );


    displayDocuments();

}


/* =====================================================
   HELPER FUNCTIONS
===================================================== */


/* ================= DATE ================= */

function formatDate(dateString) {

    if (!dateString) {
        return "Not provided";
    }


    const date =
        new Date(dateString);


    if (isNaN(date)) {
        return dateString;
    }


    return date.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


/* ================= FILE SIZE ================= */

function formatFileSize(bytes) {

    if (!bytes) {
        return "0 KB";
    }


    const kilobytes =
        bytes / 1024;


    if (kilobytes < 1024) {

        return (
            kilobytes.toFixed(1) +
            " KB"
        );

    }


    const megabytes =
        kilobytes / 1024;


    return (
        megabytes.toFixed(1) +
        " MB"
    );

}


/* ================= SECURITY ================= */

function escapeHTML(value) {

    const div =
        document.createElement("div");


    div.textContent =
        value || "";


    return div.innerHTML;

}


/* =====================================================
   START
===================================================== */

loadProfile();

displayVaccinations();

displayHistory();

displayDocuments();