const additionalOptions = document.getElementById("additionalOptions");
const addDoctorBtn = document.getElementById("addDoctorBtn");
const updateBtn = document.getElementById("updateBtn");
const doctorSection = document.getElementById("doctorSection");

let doctorBlocks = [];

// 🟡 Predefined doctor arrays per hospital
const malakpetDoctors = ["Dr. A Sharma", "Dr. B Reddy", "Dr. C Rao", "Dr. D Kumar"];
const somajigudaDoctors = ["Dr. M Paul", "Dr. N Iyer", "Dr. O Verma", "Dr. P Naik"];
const hitecDoctors = ["Dr. M Paul", "Dr. N Iyer", "Dr. O Verma", "Dr. P Naik"];
const secDoctors= ["Dr. I Rao", "Dr. J Rani", "Dr. K Joshi", "Dr. L Dev"];

// ✅ Time input generator using Flatpickr
function createTimeInput(defaultTime = "10:00 AM") {
  const input = document.createElement("input");
  input.type = "text";
  input.required = true;
  input.classList.add("flatpickr-input");

  flatpickr(input, {
    enableTime: true,
    noCalendar: true,
    dateFormat: "h:i K",
    defaultDate: defaultTime,
    time_24hr: false
  });

  return input;
}

// 🟡 Creates one doctor input row
function addDoctorBlock(doctorName = "", start = "", end = "", doctorOptions = []) {
  const div = document.createElement("div");
  div.classList.add("doctor-block");

  const doctorLabel = document.createElement("label");
  doctorLabel.textContent = "Select Doctor:";
  const doctorSelect = document.createElement("select");
  doctorSelect.required = true;

  const defaultOption = document.createElement("option");
  defaultOption.text = "Select Doctor";
  defaultOption.value = "";
  doctorSelect.appendChild(defaultOption);

  doctorOptions.forEach(doc => {
    const opt = document.createElement("option");
    opt.value = doc;
    opt.text = doc;
    if (doc === doctorName) opt.selected = true;
    doctorSelect.appendChild(opt);
  });

  const startLabel = document.createElement("label");
  startLabel.textContent = "Start Time:";
  const startInput = createTimeInput(start || "10:00 AM");

  const endLabel = document.createElement("label");
  endLabel.textContent = "End Time:";
  const endInput = createTimeInput(end || "1:00 PM");

  div.appendChild(doctorLabel);
  div.appendChild(doctorSelect);
  div.appendChild(startLabel);
  div.appendChild(startInput);
  div.appendChild(endLabel);
  div.appendChild(endInput);

  doctorSection.appendChild(div);
  doctorBlocks.push({ div, doctorSelect, startInput, endInput });
}

// 🔁 Clears and resets doctor blocks
function resetDoctorSection() {
  doctorSection.innerHTML = "";
  doctorBlocks = [];
}

// 🟢 Load appropriate doctor list based on hospital
function loadDoctorsForHospital(hospitalName) {
  resetDoctorSection();

  let doctorOptions = [];

  if (hospitalName === "Apollo Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Apollo Hospital, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Apollo Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Apollo Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Care Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Care Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Care Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Care Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "KIMS Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "KIMS Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "KIMS Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "KIMS Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "AIG Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "AIG Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "AIG Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "AIG Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Continental Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Continental Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Continental Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Continental Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } 
  

  // Add 1 blank block with relevant doctor list
  addDoctorBlock("", "", "", doctorOptions);

  // 🟢 Optional: load existing doctor data from DB
  fetch("/getHospitalData")
    .then(res => res.json())
    .then(hospitals => {
      const hospital = hospitals.find(h => h.name === hospitalName);
      if (hospital && hospital.doctors && hospital.doctors.length > 0) {
        resetDoctorSection();
        hospital.doctors.forEach(doc => {
          addDoctorBlock(doc.doctor, doc.start, doc.end, doctorOptions);
        });
      }
    })
    .catch(err => {
      console.error("Error loading doctors:", err);
    });
}

// ➕ Add another doctor block with current hospital's doctor list
addDoctorBtn.addEventListener("click", () => {
  const hospitalName = document.getElementById("hospital").value;
  let doctorOptions = [];

  if (hospitalName === "Apollo Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Apollo Hospital, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Apollo Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Apollo Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Yashoda Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Care Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Care Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Care Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Care Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "KIMS Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "KIMS Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "KIMS Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "KIMS Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "AIG Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "AIG Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "AIG Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "AIG Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Continental Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Continental Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Continental Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Continental Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Sunshine Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Citizenship Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Malakpet") {
    doctorOptions = malakpetDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Somajiguda") {
    doctorOptions = somajigudaDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Hitec City") {
    doctorOptions = hitecDoctors;
  } else if (hospitalName === "Rainbow Hospitals, Secunderabad") {
    doctorOptions = secDoctors;
  } 

  addDoctorBlock("", "", "", doctorOptions);
});

// 🟢 Update button logic to send data to backend
updateBtn.addEventListener("click", async () => {
  const beds = document.getElementById("beds").value;
  const hospitalName = document.getElementById("hospital").value;

  const newDoctorsInfo = [];

  for (const block of doctorBlocks) {
    const { doctorSelect, startInput, endInput } = block;
    const doctor = doctorSelect.value.trim();
    const start = startInput.value.trim();
    const end = endInput.value.trim();

    if (!doctor || !start || !end) {
      alert("Please fill in all fields for each doctor.");
      return;
    }

    newDoctorsInfo.push({ doctor, start, end });
  }

  if (!beds || newDoctorsInfo.length === 0) {
    alert("Please complete all fields before submitting.");
    return;
  }

  try {
    const res = await fetch("/getHospitalData");
    const allHospitals = await res.json();
    const hospital = allHospitals.find(h => h.name === hospitalName);

    if (!hospital) {
      alert("Hospital not found.");
      return;
    }

    const mergedDoctors = [...hospital.doctors];

    newDoctorsInfo.forEach(updatedDoc => {
      const index = mergedDoctors.findIndex(d => d.doctor === updatedDoc.doctor);
      if (index !== -1) {
        mergedDoctors[index] = updatedDoc;
      } else {
        mergedDoctors.push(updatedDoc);
      }
    });

    const updateRes = await fetch("/updateHospitalInfo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hospitalName,
        beds,
        doctors: mergedDoctors
      })
    });

    const result = await updateRes.json();
    alert("Updated successfully: " + result.message);
  } catch (err) {
    alert("Error updating: " + err.message);
  }
});

// ✅ Expose for use in login.html
window.loadDoctorsForHospital = loadDoctorsForHospital;
