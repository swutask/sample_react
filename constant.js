export const ethnicityObject= {
    'BLACK': "Black",
    'WHITE': "White",
    'HISPANIC' : "Hispanic",
    'ASIAN': "Asian",
  }

export const financingObject = {
    'STATE_FUNDED': "State Funded",
    'TUTION': "Tution",
  }
  
  export const SingleStudentDetailsObject = {
      FULL_TIME: "Full time",
      PART_TIME: "Part time",
      FRESHMAN: "Freshman",
      SOPHOMORE: "Sophomore",
      JUNIOR: "Junior",
      SENIOR: "Senior",
      MALE: "Male",
      FEMALE: "Female",
      OTHERS: "Others",
    }

   export const riskCalculationHandler =  (graduationProbablity) => {
      if(graduationProbablity >= 0 && graduationProbablity < 50){
        return "High";
      }
      else if (graduationProbablity >= 50 && graduationProbablity < 75){
        return "Moderate";
      }
      else if (graduationProbablity >= 75 && graduationProbablity < 100){
        return "Low";
      }
    }