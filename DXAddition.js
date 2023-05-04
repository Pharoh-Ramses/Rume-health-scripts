const csv = require("csv-parser");
const fs = require("fs");
const results = [];

fs.createReadStream("Medical Orders Demographic Unprocessed.csv")
  .pipe(csv())
  .on("data", (data) => {
    if (data["symptoms_observed"]) {
      data["DX"] = "Z20.822";
      if (data["symptoms_observed"].includes("Cough")) {
        data["DX"] += ", R05.9";
      }
      if (data["symptoms_observed"].includes("Chills")) {
        data["DX"] += ", R68.83T";
      }
      if (data["symptoms_observed"].includes("Headache")) {
        data["DX"] += ", R51";
      }
      if (data["symptoms_observed"].includes("Fatigue")) {
        data["DX"] += ", R53.83";
      }
      if (data["symptoms_observed"].includes("Fever")) {
        data["DX"] += ", R50.9";
      }
      if (data["symptoms_observed"].includes("Nasal congestion")) {
        data["DX"] += ", R09.81";
      }
      if (data["symptoms_observed"].includes("Sore throat")) {
        data["DX"] += ", R07.0";
      }
      if (data["symptoms_observed"].includes("Myalgia")) {
        data["DX"] += ", M79.10";
      }
      if (data["symptoms_observed"].includes("Muscle pain (Myalgia)")) {
        data["DX"] += ", M79.10";
      }
      if (data["symptoms_observed"].includes("Diarrhea")) {
        data["DX"] += ", R19.7";
      }
      if (data["symptoms_observed"].includes("Loss of appetite")) {
        data["DX"] += ", R63";
      }
      if (data["symptoms_observed"].includes("Loss of taste of smell")) {
        data["DX"] += ", R43";
      }
    }
    if (data["pregnant"]) {
      if (data["pregnant"].includes("Yes")) {
        data["DX"] += ", Z33.1";
      }
    }
    if (data["underlying_conditions"]) {
      if (data["underlying_conditions"].includes("Diabetes")) {
        data["DX"] += ", E11.9";
      }
      if (data["underlying_conditions"].includes("Hypertension")) {
        data["DX"] += ", i10";
      }
      if (data["underlying_conditions"].includes("Cardiac Disease")) {
        data["DX"] += ", i51.9";
      }
      if (data["underlying_conditions"].includes("Immunocompromised")) {
        data["DX"] += ", D84.9";
      }
      if (data["underlying_conditions"].includes("Chronic Lung Disease")) {
        data["DX"] += ", J98.4";
      }
      if (data["underlying_conditions"].includes("Chronic Liver Disease")) {
        data["DX"] += ", K76.9";
      }
      if (data["underlying_conditions"].includes("Obesity")) {
        data["DX"] += ", E66.8";
      }
      if (data["underlying_conditions"].includes("Cancer")) {
        data["DX"] += ", C80.1";
      }
      if (data["underlying_conditions"].includes("Dialysis")) {
        data["DX"] += ", Z99.2";
      }
    }
    results.push(data);
  })
  .on("end", () => {
    const csvWriter = require("csv-writer").createObjectCsvWriter({
      path: "Medical Orders Demographic Processed.csv",
      header: [
        { id: "patient_first_name", title: "Patient First Name" },
        { id: "patient_last_name", title: "Patient Last Name" },
        { id: "patients_date_of_birth", title: "Date of Birth" },
        { id: "patients_sex", title: "Sex" },
        { id: "patients_address", title: "Address" },
        { id: "patients_address_2", title: "Address 2" },
        { id: "patients_city", title: "City" },
        { id: "patients_state", title: "State" },
        { id: "patients_zip", title: "Zip Code" },
        { id: "patients_phone", title: "Phone Number" },
        { id: "CPT", title: "CPT Code" },
        { id: "DX", title: "Diagnosis Code" },
        { id: "exposure", title: "Exposure" },
        { id: "symptoms_observed", title: "Symptoms Observed" },
        { id: "underlying_conditions", title: "Underlying Conditions" },
        { id: "pregnant", title: "Pregnant" },
      ],
    });
    csvWriter.writeRecords(results).then(() => {
      console.log("CSV file written successfully");
    });
  });
