import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  BookOpen, 
  ChevronRight, 
  Calculator, 
  GitBranch, 
  FileText, 
  Sparkles,
  RefreshCw,
  RotateCcw,
  Trophy,
  Lock,
  AlertTriangle,
  Settings
} from 'lucide-react';
import { aptitudeQuestions } from '../data/tcsQuestionBank';

// --- DETERMINISTIC 75-DAY APTITUDE QUESTION GENERATOR ---
function generateAptitudeQuestions(day, category) {
  const questions = [];
  
  // Seed-based random helper for deterministic variables
  const getRand = (seedIdx) => {
    const str = `${day}-${category}-${seedIdx}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash) * 10000;
    return x - Math.floor(x);
  };

  const getRandomInt = (seedIdx, min, max) => {
    const r = getRand(seedIdx);
    return Math.floor(r * (max - min + 1)) + min;
  };

  const pickRandom = (seedIdx, arr) => {
    const idx = getRandomInt(seedIdx, 0, arr.length - 1);
    return arr[idx];
  };

  for (let qIdx = 0; qIdx < 10; qIdx++) {
    const seed = qIdx;
    let questionObj = {};

    if (category === "Quantitative Aptitude") {
      const subTopics = [
        "Profit & Loss",
        "Time & Work",
        "Speed, Distance & Time",
        "Simple & Compound Interest",
        "Probability & Combinations",
        "Ratio & Proportion",
        "Percentages & Averages",
        "Number Systems",
        "Algebraic Equations",
        "Mensuration & Geometry"
      ];
      const subTopic = subTopics[qIdx % subTopics.length];
      
      if (subTopic === "Profit & Loss") {
        const cp = getRandomInt(seed, 3, 9) * 100;
        const loss = getRandomInt(seed + 1, 5, 15);
        const gain = getRandomInt(seed + 2, 5, 15);
        const diff = (cp * (loss + gain)) / 100;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `A retailer sells a gadget at a loss of ${loss}%. If he had sold it for Rs. ${diff.toFixed(2)} more, he would have gained ${gain}%. What is the cost price (CP) of the gadget?`,
          options: [
            `Rs. ${cp}`,
            `Rs. ${(cp + 80)}`,
            `Rs. ${(cp - 50)}`,
            `Rs. ${(cp + 120)}`
          ],
          answer: 0,
          explanation: `Let the Cost Price (CP) be 100%.\nInitial Selling Price (SP1) at ${loss}% loss = ${100 - loss}%.\nNew Selling Price (SP2) at ${gain}% gain = ${100 + gain}%.\n\nDifference in SP = SP2 - SP1 = ${100 + gain}% - ${100 - loss}% = ${loss + gain}%.\nGiven, this difference is Rs. ${diff.toFixed(2)}.\nTherefore, CP = (${diff.toFixed(2)} / ${loss + gain}) * 100 = Rs. ${cp}.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      } 
      else if (subTopic === "Time & Work") {
        const rateA = getRandomInt(seed, 8, 20);
        const rateB = getRandomInt(seed + 1, 10, 30);
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const lcm = (rateA * rateB) / gcd(rateA, rateB);
        const effA = lcm / rateA;
        const effB = lcm / rateB;
        const totalDays = lcm / (effA + effB);
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Worker A can complete a construction project in ${rateA} days, and Worker B can complete the same project in ${rateB} days. Working together, in how many days will they finish the task?`,
          options: [
            `${totalDays.toFixed(2)} days`,
            `${(totalDays + 1.5).toFixed(2)} days`,
            `${(totalDays - 0.8).toFixed(2)} days`,
            `${(totalDays * 1.2).toFixed(2)} days`
          ],
          answer: 0,
          explanation: `A's 1-day work rate = 1/${rateA}.\nB's 1-day work rate = 1/${rateB}.\n\nCombined 1-day rate = 1/${rateA} + 1/${rateB} = (${rateA} + ${rateB}) / ${(rateA * rateB)}.\nTotal days to complete work together = ${(rateA * rateB)} / (${rateA} + ${rateB}) = ${totalDays.toFixed(2)} days.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Speed, Distance & Time") {
        const speed = getRandomInt(seed, 40, 80);
        const hours = getRandomInt(seed + 1, 2, 6);
        const distance = speed * hours;
        const newSpeed = speed + 20;
        const newHours = distance / newSpeed;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `A car travels a certain distance at a constant speed of ${speed} km/h in ${hours} hours. At what speed must it travel to cover the same distance in ${newHours.toFixed(2)} hours?`,
          options: [
            `${newSpeed} km/h`,
            `${(newSpeed - 10)} km/h`,
            `${(newSpeed + 15)} km/h`,
            `${(newSpeed - 5)} km/h`
          ],
          answer: 0,
          explanation: `Distance = Speed × Time = ${speed} km/h × ${hours} hours = ${distance} km.\nTo cover ${distance} km in ${newHours.toFixed(2)} hours:\nNew Speed = Distance / New Time = ${distance} / ${newHours.toFixed(2)} = ${newSpeed} km/h.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Simple & Compound Interest") {
        const principal = getRandomInt(seed, 5, 20) * 1000;
        const rate = getRandomInt(seed + 1, 5, 12);
        const years = getRandomInt(seed + 2, 2, 4);
        const si = (principal * rate * years) / 100;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Find the Simple Interest on Rs. ${principal} at ${rate}% per annum for a period of ${years} years.`,
          options: [
            `Rs. ${si}`,
            `Rs. ${(si + 150)}`,
            `Rs. ${(si - 100)}`,
            `Rs. ${(si * 1.15).toFixed(0)}`
          ],
          answer: 0,
          explanation: `Simple Interest (SI) formula = (P × R × T) / 100.\nSI = (${principal} × ${rate} × ${years}) / 100 = Rs. ${si}.`,
          years_seen: [2019 + (day % 7), 2026]
        };
      }
      else if (subTopic === "Probability & Combinations") {
        const red = getRandomInt(seed, 4, 8);
        const blue = getRandomInt(seed + 1, 3, 7);
        const total = red + blue;
        const correctProb = (red * (red - 1)) / (total * (total - 1));
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `A bag contains ${red} red marbles and ${blue} blue marbles. If two marbles are drawn at random one after another without replacement, what is the probability that both marbles are red?`,
          options: [
            `${(correctProb * 100).toFixed(1)}%`,
            `${((correctProb + 0.1) * 100).toFixed(1)}%`,
            `${((correctProb - 0.08) * 100).toFixed(1)}%`,
            `${((correctProb * 1.3) * 100).toFixed(1)}%`
          ],
          answer: 0,
          explanation: `Total marbles = ${red} + ${blue} = ${total}.\nProbability of 1st marble being red = ${red}/${total}.\nAfter drawing one red, remaining red marbles = ${red - 1}, remaining total = ${total - 1}.\nProbability of 2nd marble being red = ${red - 1}/${total - 1}.\n\nCombined Probability = (${red}/${total}) × (${red - 1}/${total - 1}) = ${((red * (red - 1)))}/${(total * (total - 1))} ≈ ${(correctProb * 100).toFixed(1)}%.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else if (subTopic === "Ratio & Proportion") {
        const ratioA = getRandomInt(seed, 2, 5);
        const ratioB = getRandomInt(seed + 1, 3, 7);
        const multiplier = getRandomInt(seed + 2, 15, 40);
        const valA = ratioA * multiplier;
        const valB = ratioB * multiplier;
        const totalSum = valA + valB;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Two numbers are in the ratio ${ratioA}:${ratioB}. If their sum is ${totalSum}, find the value of the larger number.`,
          options: [
            `${Math.max(valA, valB)}`,
            `${Math.min(valA, valB)}`,
            `${(Math.max(valA, valB) + 15)}`,
            `${(Math.max(valA, valB) - 10)}`
          ],
          answer: 0,
          explanation: `Let the numbers be ${ratioA}x and ${ratioB}x.\nGiven, ${ratioA}x + ${ratioB}x = ${totalSum} => ${ratioA + ratioB}x = ${totalSum} => x = ${multiplier}.\nLarger number = ${Math.max(ratioA, ratioB)}x = ${Math.max(ratioA, ratioB)} × ${multiplier} = ${Math.max(valA, valB)}.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Percentages & Averages") {
        const count = getRandomInt(seed, 5, 8);
        const avg = getRandomInt(seed + 1, 60, 85);
        const newNum = getRandomInt(seed + 2, 90, 100);
        const newAvg = ((avg * count) + newNum) / (count + 1);
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `The average score of ${count} students in an exam is ${avg}. When a new student's score of ${newNum} is included, what is the new average score of the class?`,
          options: [
            `${newAvg.toFixed(2)}`,
            `${(newAvg + 1.2).toFixed(2)}`,
            `${(newAvg - 0.9).toFixed(2)}`,
            `${(newAvg * 1.05).toFixed(2)}`
          ],
          answer: 0,
          explanation: `Sum of scores of first ${count} students = ${count} × ${avg} = ${count * avg}.\nNew sum with the additional score = ${count * avg} + ${newNum} = ${(count * avg) + newNum}.\nTotal students = ${count + 1}.\nNew Average = ${((count * avg) + newNum)} / ${count + 1} = ${newAvg.toFixed(2)}.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Number Systems") {
        const num1 = getRandomInt(seed, 12, 24);
        const num2 = getRandomInt(seed + 1, 15, 36);
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const hcf = gcd(num1, num2);
        const lcm = (num1 * num2) / hcf;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Find the Lowest Common Multiple (LCM) of the numbers ${num1} and ${num2}.`,
          options: [
            `${lcm}`,
            `${(lcm + 12)}`,
            `${hcf}`,
            `${(num1 * num2)}`
          ],
          answer: 0,
          explanation: `Numbers are ${num1} and ${num2}.\nPrime Factorization:\n${num1} = ${num1 % 2 === 0 ? '2 × ' + (num1/2) : '3 × ' + (num1/3)}\n${num2} = ${num2 % 2 === 0 ? '2 × ' + (num2/2) : '3 × ' + (num2/3)}\nHCF = ${hcf}.\nLCM = (Number1 × Number2) / HCF = (${num1} × ${num2}) / ${hcf} = ${lcm}.`,
          years_seen: [2018 + (day % 8), 2026]
        };
      }
      else if (subTopic === "Algebraic Equations") {
        const x = getRandomInt(seed, 2, 7);
        const y = getRandomInt(seed + 1, 3, 9);
        const eq1Val = 3*x + 2*y;
        const eq2Val = 2*x - y;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Solve the system of equations for x:\n3x + 2y = ${eq1Val}\n2x - y = ${eq2Val}`,
          options: [
            `x = ${x}`,
            `x = ${(x + 1)}`,
            `x = ${(x - 2)}`,
            `x = ${(x + 3)}`
          ],
          answer: 0,
          explanation: `Multiply the second equation by 2:\n4x - 2y = ${2 * eq2Val}\n\nAdd this to the first equation:\n(3x + 2y) + (4x - 2y) = ${eq1Val} + ${2 * eq2Val} => 7x = ${eq1Val + 2 * eq2Val} => x = ${x}.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else {
        const radius = getRandomInt(seed, 5, 14);
        const area = Math.PI * radius * radius;
        
        questionObj = {
          id: `quant_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Calculate the area of a circular track of radius ${radius} meters. (Take π = 3.1416)`,
          options: [
            `${area.toFixed(2)} sq.m`,
            `${(area + 25).toFixed(2)} sq.m`,
            `${(area - 18).toFixed(2)} sq.m`,
            `${(area * 1.1).toFixed(2)} sq.m`
          ],
          answer: 0,
          explanation: `Area of circle formula = π × r².\nArea = 3.1416 × ${radius} × ${radius} = ${area.toFixed(2)} sq.m.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
    } 
    else if (category === "Logical Reasoning") {
      const subTopics = [
        "Blood Relations",
        "Coding-Decoding",
        "Syllogisms",
        "Direction Sense",
        "Seating Arrangements",
        "Data Sufficiency",
        "Series & Patterns",
        "Clocks & Calendars",
        "Venn Diagrams",
        "Assumptions & Conclusions"
      ];
      const subTopic = subTopics[qIdx % subTopics.length];

      if (subTopic === "Blood Relations") {
        const maleNames = ["Arun", "Ramesh", "Deepak", "Suresh"];
        const femaleNames = ["Pooja", "Seema", "Lata", "Kiran"];
        const name1 = pickRandom(seed, maleNames);
        const name2 = pickRandom(seed + 1, femaleNames);
        
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Pointing to a man, ${name2} said, "His brother's father is the only son of my grandfather." How is the man related to ${name2}?`,
          options: [
            "Brother",
            "Uncle",
            "Cousin",
            "Father"
          ],
          answer: 0,
          explanation: `"Only son of grandfather" = father.\n"His brother's father" = the man's father.\nSince the man's father is also ${name2}'s father, the man is ${name2}'s brother.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Coding-Decoding") {
        const offset = getRandomInt(seed, 1, 3);
        const sampleWord = "INPUT";
        const codedSample = sampleWord.split('').map(c => String.fromCharCode(c.charCodeAt(0) + offset)).join('');
        const targetWord = "LOGIC";
        const codedTarget = targetWord.split('').map(c => String.fromCharCode(c.charCodeAt(0) + offset)).join('');
        
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `In a certain code, "${sampleWord}" is written as "${codedSample}". How will "${targetWord}" be written in that code?`,
          options: [
            codedTarget,
            codedTarget.split('').reverse().join(''),
            targetWord.split('').map(c => String.fromCharCode(c.charCodeAt(0) + offset + 1)).join(''),
            targetWord.split('').map(c => String.fromCharCode(c.charCodeAt(0) + offset - 1)).join('')
          ],
          answer: 0,
          explanation: `The coding logic shifts each alphabet by +${offset} positions forward.\nL (+${offset}) -> ${codedTarget[0]}\nO (+${offset}) -> ${codedTarget[1]}\nG (+${offset}) -> ${codedTarget[2]}\nI (+${offset}) -> ${codedTarget[3]}\nC (+${offset}) -> ${codedTarget[4]}\nResult: ${codedTarget}.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else if (subTopic === "Syllogisms") {
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Statements:\n1. All logs are laptops.\n2. Some laptops are tablets.\nConclusions:\nI. Some logs are tablets.\nII. Some tablets are laptops.\n\nWhich of the conclusions logically follow?`,
          options: [
            "Only conclusion II follows",
            "Only conclusion I follows",
            "Both I and II follow",
            "Neither I nor II follows"
          ],
          answer: 0,
          explanation: `- All logs are laptops, meaning the log circle is entirely within the laptop circle.\n- Some laptops are tablets, meaning tablets intersect laptops. This intersection does not guarantee tablets intersect logs. Thus, conclusion I is invalid.\n- "Some laptops are tablets" implies "Some tablets are laptops" is always true. Thus, II is valid.`,
          years_seen: [2018 + (day % 8), 2026]
        };
      }
      else if (subTopic === "Direction Sense") {
        const dist1 = getRandomInt(seed, 5, 15);
        const dist2 = getRandomInt(seed + 1, 5, 15);
        const hypotenuse = Math.sqrt(dist1*dist1 + dist2*dist2);
        
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `A boy walks ${dist1}m North, turns right and walks ${dist2}m East. How far is he from his starting point?`,
          options: [
            `${hypotenuse.toFixed(1)}m`,
            `${(dist1 + dist2)}m`,
            `${(hypotenuse + 2.5).toFixed(1)}m`,
            `${(hypotenuse - 1.2).toFixed(1)}m`
          ],
          answer: 0,
          explanation: `The path forms a right-angled triangle where base = ${dist2}m and height = ${dist1}m.\nUsing Pythagoras theorem:\nDistance = √(base² + height²) = √(${dist2}² + ${dist1}²) = √(${dist2*dist2 + dist1*dist1}) ≈ ${hypotenuse.toFixed(1)}m.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Seating Arrangements") {
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Five friends P, Q, R, S, and T are sitting in a row facing North. S is between T and Q. Q is to the immediate left of R. P is to the immediate left of T. Who is sitting in the middle?`,
          options: [
            "S",
            "T",
            "Q",
            "P"
          ],
          answer: 0,
          explanation: `- P is to the immediate left of T: PT\n- S is between T and Q: PTSQ\n- Q is to the immediate left of R: PTSQR\nThe arrangement from left to right is P, T, S, Q, R.\nThe middle seat is occupied by S.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Data Sufficiency") {
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Question: What is the age of John?\nStatements:\nI. John is 3 years older than his sister Mary.\nII. Mary is currently 15 years old.\n\nWhich statements are sufficient to answer the question?`,
          options: [
            "Both statements I and II together are sufficient",
            "Statement I alone is sufficient",
            "Statement II alone is sufficient",
            "Statements I and II together are NOT sufficient"
          ],
          answer: 0,
          explanation: `- Statement I tells us John = Mary + 3, which is not enough on its own (John's age unknown).\n- Statement II tells us Mary = 15, which is not enough on its own.\n- Combining both, we get John = 15 + 3 = 18 years old. Therefore, both together are sufficient.`,
          years_seen: [2019 + (day % 7), 2026]
        };
      }
      else if (subTopic === "Series & Patterns") {
        const start = getRandomInt(seed, 2, 5);
        const add = getRandomInt(seed + 1, 3, 6);
        const terms = [start, start + add, start + 2*add, start + 3*add];
        const nextTerm = start + 4*add;
        
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Find the next number in the arithmetic series: ${terms.join(', ')}, ?`,
          options: [
            `${nextTerm}`,
            `${(nextTerm + add)}`,
            `${(nextTerm - 2)}`,
            `${(nextTerm * 1.15).toFixed(0)}`
          ],
          answer: 0,
          explanation: `The series increases by a constant common difference of +${add}.\n${terms[0]} (+${add}) -> ${terms[1]} (+${add}) -> ${terms[2]} (+${add}) -> ${terms[3]}.\nNext term = ${terms[3]} + ${add} = ${nextTerm}.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else if (subTopic === "Clocks & Calendars") {
        const daysAhead = getRandomInt(seed, 15, 60);
        const remainder = daysAhead % 7;
        const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const todayIdx = getRandomInt(seed + 1, 0, 6);
        const today = dayNames[todayIdx];
        const targetDay = dayNames[(todayIdx + remainder) % 7];
        
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `If today is ${today}, what day of the week will it be after ${daysAhead} days?`,
          options: [
            targetDay,
            dayNames[(todayIdx + remainder + 1) % 7],
            dayNames[(todayIdx + remainder + 5) % 7],
            "Sunday"
          ],
          answer: 0,
          explanation: `A week consists of 7 days.\nNumber of odd days = ${daysAhead} mod 7 = ${remainder}.\nSince today is ${today}, counting ${remainder} days forward gives ${targetDay}.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Venn Diagrams") {
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Which of the following Venn diagrams correctly represents the relationship between: "Dogs", "Pets", and "Cats"?`,
          options: [
            "Two separate circles intersecting a central 'Pets' circle",
            "Three concentric circles nested inside each other",
            "Three completely separate circles with no intersections",
            "One large circle enclosing two completely intersecting circles"
          ],
          answer: 0,
          explanation: `- Some dogs are pets and some cats are pets, but no dog is a cat.\n- Therefore, 'Dogs' and 'Cats' circles are separate but both partially intersect the central 'Pets' circle.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else {
        questionObj = {
          id: `logic_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Statement: "The government should ban smoking in all public places to protect non-smokers."\nAssumptions:\nI. Non-smokers are exposed to health risks due to passive smoking.\nII. Banning smoking in public places will reduce their exposure.\n\nWhich assumptions are implicit in the statement?`,
          options: [
            "Both I and II are implicit",
            "Only I is implicit",
            "Only II is implicit",
            "Neither I nor II is implicit"
          ],
          answer: 0,
          explanation: `- Assumption I is implicit because the goal is to "protect non-smokers", meaning they are currently exposed to risk.\n- Assumption II is implicit because banning smoking assumes it will successfully protect them by reducing exposure.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
    } 
    else {
      const subTopics = [
        "Sentence Completion",
        "Spotting Errors",
        "Reading Comprehension",
        "Synonyms & Antonyms",
        "Sentence Improvement",
        "Para Jumbles",
        "Idioms & Phrases",
        "Prepositions & Conjunctions",
        "One Word Substitution",
        "Active & Passive Voice"
      ];
      const subTopic = subTopics[qIdx % subTopics.length];

      if (subTopic === "Sentence Completion") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Choose the correct word to complete the sentence: The candidate's response was ________, leaving no room for further questioning or ambiguity.`,
          options: [
            "unequivocal",
            "vague",
            "hesitant",
            "verbose"
          ],
          answer: 0,
          explanation: `'unequivocal' means clear and leaving no doubt, which perfectly matches the phrase "leaving no room for further questioning or ambiguity".`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Spotting Errors") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Identify the segment in the sentence that contains a grammatical error: "Neither of the two candidates who applied for the job were selected."`,
          options: [
            "were selected",
            "Neither of the two candidates",
            "who applied",
            "for the job"
          ],
          answer: 0,
          explanation: `The subject is pronoun "Neither" which is singular and takes a singular verb. Therefore, "were selected" is grammatically incorrect and should be replaced with "was selected".`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Reading Comprehension") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Passage: "AI systems are rapidly changing the landscape of software development. While some fear displacement of human engineers, the majority of experts agree that AI acts as an accelerator, automating repetitive tasks and enabling engineers to focus on higher-level system architecture."\n\nQuestion: According to the passage, what is the primary role of AI in software development?`,
          options: [
            "Serving as a productivity accelerator for human engineers",
            "Completely replacing human software developers",
            "Automating the design of system architectures",
            "Preventing repetitive coding tasks from being created"
          ],
          answer: 0,
          explanation: `The passage explicitly states: "the majority of experts agree that AI acts as an accelerator, automating repetitive tasks and enabling engineers to focus on higher-level system architecture."`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else if (subTopic === "Synonyms & Antonyms") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Choose the word which is closest in meaning (Synonym) to the word: "MITIGATE"`,
          options: [
            "alleviate",
            "aggravate",
            "intensify",
            "confirm"
          ],
          answer: 0,
          explanation: `"Mitigate" means to make less severe, serious, or painful. "Alleviate" is a synonym meaning to make suffering or problem less severe.`,
          years_seen: [2018 + (day % 8), 2026]
        };
      }
      else if (subTopic === "Sentence Improvement") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Improve the underlined part of the sentence: "If I **would have** worked harder, I would have cleared the selection interview."`,
          options: [
            "had",
            "would",
            "have had",
            "No improvement needed"
          ],
          answer: 0,
          explanation: `In third conditional sentences, the structure is: "If + past perfect (had + V3), would + have + past participle (V3)". Therefore, "would have" should be replaced with "had".`,
          years_seen: [2019 + (day % 7), 2026]
        };
      }
      else if (subTopic === "Para Jumbles") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Rearrange the following sentences (P, Q, R, S) to form a coherent paragraph:\nP. This leads to global warming.\nQ. Greenhouse gases trap heat in the atmosphere.\nR. Deforestation contributes significantly to these emissions.\nS. Industrial activity is another major driver of emissions.`,
          options: [
            "QRSP",
            "PRQS",
            "SPQR",
            "QPRS"
          ],
          answer: 0,
          explanation: `- Q introduces the main topic (greenhouse gases trapping heat).\n- R and S elaborate on sources of these greenhouse gas emissions.\n- P concludes the paragraph with the direct consequence (global warming).`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else if (subTopic === "Idioms & Phrases") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `What is the meaning of the idiom: "Spill the beans"?`,
          options: [
            "Reveal a secret prematurely",
            "Waste food products",
            "Create a mess in the kitchen",
            "Work extremely hard"
          ],
          answer: 0,
          explanation: `The idiom "spill the beans" is an informal term meaning to disclose confidential information or reveal a secret.`,
          years_seen: [2020 + (day % 6), 2026]
        };
      }
      else if (subTopic === "Prepositions & Conjunctions") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Choose the correct preposition to complete the sentence: The committee decided to adhere ________ the original plan despite the sudden change in market trends.`,
          options: [
            "to",
            "with",
            "by",
            "on"
          ],
          answer: 0,
          explanation: `The verb "adhere" is phrasally followed by the preposition "to". Hence, "adhere to" is correct.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
      else if (subTopic === "One Word Substitution") {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Find the word that can substitute the phrase: "A person who is indifferent to pleasure or pain."`,
          options: [
            "stoic",
            "optimist",
            "altruist",
            "sadist"
          ],
          answer: 0,
          explanation: `A "stoic" is a person who can endure pain or hardship without showing their feelings or complaining.`,
          years_seen: [2022 + (day % 4), 2026]
        };
      }
      else {
        questionObj = {
          id: `verbal_${day}_${qIdx}`,
          category,
          sub_topic: subTopic,
          difficulty: day <= 25 ? "Easy" : day <= 55 ? "Medium" : "Hard",
          question: `Change the sentence to passive voice: "The team completed the assignment before the deadline."`,
          options: [
            "The assignment was completed by the team before the deadline.",
            "The assignment has been completed by the team before the deadline.",
            "The assignment completed the team before the deadline.",
            "The deadline was met by completing the assignment by the team."
          ],
          answer: 0,
          explanation: `In simple past active ("completed"), the passive form is "was/were + past participle" ("was completed"). The object "the assignment" becomes the subject.`,
          years_seen: [2021 + (day % 5), 2026]
        };
      }
    }

    // Shuffle options deterministically so correct answer is randomly distributed among A, B, C, D
    if (questionObj.options && questionObj.options.length > 1) {
      const correctVal = questionObj.options[0];
      const targetIdx = getRandomInt(seed + 88, 0, questionObj.options.length - 1);
      if (targetIdx !== 0) {
        const temp = questionObj.options[targetIdx];
        questionObj.options[targetIdx] = correctVal;
        questionObj.options[0] = temp;
      }
      questionObj.answer = targetIdx;
    }

    questions.push(questionObj);
  }

  return questions;
}

export default function TcsAptitude() {
  // --- STATES ---
  const [selectedDay, setSelectedDay] = useState(() => {
    try {
      const meta = localStorage.getItem('wingora_tcs_user_meta');
      if (meta) {
        const parsed = JSON.parse(meta);
        if (parsed && parsed.current_unlocked_day) {
          return parsed.current_unlocked_day;
        }
      }
    } catch (e) {}
    return 1;
  });
  const [activeCategory, setActiveCategory] = useState(null); // null, 'Quantitative Aptitude', 'Logical Reasoning', 'Verbal Ability'
  const [currentScreen, setCurrentScreen] = useState('lobby'); // 'lobby', 'practice', 'summary'
  
  // Practice deck state
  const [deck, setDeck] = useState([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [checkedAnswer, setCheckedAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [sessionAnswers, setSessionAnswers] = useState([]); // list of { questionId, selectedIndex, isCorrect }

  // Reset Confirmation Modal
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Cooldown & Progress tracking
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem('wingora_tcs_aptitude_progress');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // --- PROGRESSION & COOLDOWN HELPERS ---
  const getAptitudeDayStatus = (dayNum, category) => {
    const catProgress = progress[category] || {};
    const dayProg = catProgress[dayNum];

    if (dayProg && dayProg.status === 'completed') {
      return { status: 'completed', score: dayProg.score };
    }

    if (dayNum === 1) {
      return { status: 'unlocked' };
    }

    // Check if the previous day is completed
    const prevProg = catProgress[dayNum - 1];
    if (!prevProg || prevProg.status !== 'completed') {
      return { status: 'locked' };
    }

    // Previous day is completed! Check 10-hour cooldown
    if (prevProg.completedAt) {
      const completedTime = new Date(prevProg.completedAt).getTime();
      const COOLDOWN_DURATION = 10 * 60 * 60 * 1000; // 10 hours
      const elapsedTime = currentTime - completedTime;

      if (elapsedTime < COOLDOWN_DURATION) {
        const remainingTime = COOLDOWN_DURATION - elapsedTime;
        return { 
          status: 'cooldown', 
          remainingTime,
          unlocksAt: completedTime + COOLDOWN_DURATION
        };
      }
    }

    return { status: 'unlocked' };
  };

  const getOverallDayStatus = (d) => {
    if (d === 1) return 'unlocked';

    const quantStatus = getAptitudeDayStatus(d, 'Quantitative Aptitude').status;
    const logicStatus = getAptitudeDayStatus(d, 'Logical Reasoning').status;
    const verbalStatus = getAptitudeDayStatus(d, 'Verbal Ability').status;

    if (quantStatus === 'completed' && logicStatus === 'completed' && verbalStatus === 'completed') {
      return 'completed';
    }
    if (quantStatus === 'locked' && logicStatus === 'locked' && verbalStatus === 'locked') {
      return 'locked';
    }
    return 'unlocked';
  };

  const formatCooldown = (ms) => {
    const totalSecs = Math.floor(ms / 1000);
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${hrs.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m ${secs.toString().padStart(2, '0')}s`;
  };

  // --- HANDLERS ---
  const startPractice = (category) => {
    const statusInfo = getAptitudeDayStatus(selectedDay, category);
    if (statusInfo.status === 'locked' || statusInfo.status === 'cooldown') {
      return; // click disabled in UI, but safety check
    }

    const generated = generateAptitudeQuestions(selectedDay, category);
    
    setDeck(generated);
    setCurrentQIdx(0);
    setSelectedOption(null);
    setCheckedAnswer(false);
    setScore(0);
    setSessionAnswers([]);
    setActiveCategory(category);
    setCurrentScreen('practice');
  };

  const handleOptionSelect = (idx) => {
    if (checkedAnswer) return; // disable selection once checked
    setSelectedOption(idx);
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    setCheckedAnswer(true);
    
    const isCorrect = selectedOption === deck[currentQIdx].answer;
    if (isCorrect) setScore(prev => prev + 1);

    setSessionAnswers(prev => [
      ...prev,
      {
        questionId: deck[currentQIdx].id,
        selectedIndex: selectedOption,
        isCorrect
      }
    ]);
  };

  const handleNext = () => {
    if (currentQIdx < deck.length - 1) {
      setCurrentQIdx(prev => prev + 1);
      setSelectedOption(null);
      setCheckedAnswer(false);
    } else {
      // Mark active day & category completed with 10-hour cooldown
      const calculatedScore = Math.round((score / deck.length) * 100);
      const updatedProgress = { ...progress };
      
      if (!updatedProgress[activeCategory]) {
        updatedProgress[activeCategory] = {};
      }
      
      updatedProgress[activeCategory][selectedDay] = {
        status: 'completed',
        completedAt: Date.now(),
        score: calculatedScore
      };
      
      setProgress(updatedProgress);
      localStorage.setItem('wingora_tcs_aptitude_progress', JSON.stringify(updatedProgress));

      setCurrentScreen('summary');
    }
  };

  const quitPractice = () => {
    setCurrentScreen('lobby');
    setActiveCategory(null);
  };

  const executeResetAptitudeProgress = () => {
    localStorage.removeItem('wingora_tcs_aptitude_progress');
    setProgress({});
    setSelectedDay(1);
    setCurrentScreen('lobby');
    setActiveCategory(null);
    setShowResetConfirm(false);
  };

  // Categories configurations
  const categories = [
    {
      id: 'quant',
      title: 'Quantitative Aptitude',
      desc: 'Arithmetic, Percentages, Time & Work, Interest, Number Systems, and Algebra equations.',
      icon: Calculator,
      gradientBg: 'rgba(13, 17, 28, 0.75)',
      gradientBorder: '1px solid rgba(56, 189, 248, 0.3)',
      badgeGradient: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2), rgba(6, 182, 212, 0.2))',
      badgeColor: '#38bdf8',
      accentColor: '#38bdf8',
      totalCount: 10,
      topics: [
        'Profit & Loss', 'Time & Work', 'Speed & Distance', 'Simple & Compound Interest',
        'Probability', 'Ratio & Proportion', 'Averages', 'Number Systems', 'Algebra', 'Mensuration'
      ]
    },
    {
      id: 'logic',
      title: 'Logical Reasoning',
      desc: 'Coding-decoding, Syllogisms, Blood relations, Venn diagrams, and Pattern completion.',
      icon: GitBranch,
      gradientBg: 'rgba(13, 17, 28, 0.75)',
      gradientBorder: '1px solid rgba(168, 85, 247, 0.3)',
      badgeGradient: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(236, 72, 153, 0.2))',
      badgeColor: '#c084fc',
      accentColor: '#c084fc',
      totalCount: 10,
      topics: [
        'Coding-Decoding', 'Blood Relations', 'Direction Sense', 'Seating Arrangements',
        'Data Sufficiency', 'Series & Patterns', 'Clocks & Calendars', 'Venn Diagrams', 'Syllogisms', 'Statement Assumptions'
      ]
    },
    {
      id: 'verbal',
      title: 'Verbal Ability',
      desc: 'Grammar structures, Vocabulary fits, Reading comprehension, and Parajumbles sorting.',
      icon: FileText,
      gradientBg: 'rgba(13, 17, 28, 0.75)',
      gradientBorder: '1px solid rgba(16, 185, 129, 0.3)',
      badgeGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(20, 184, 166, 0.2))',
      badgeColor: '#34d399',
      accentColor: '#34d399',
      totalCount: 10,
      topics: [
        'Sentence Completion', 'Spotting Errors', 'Reading Comprehension', 'Synonyms & Antonyms',
        'Sentence Improvement', 'Para Jumbles', 'Idioms & Phrases', 'Prepositions', 'One Word Substitution', 'Active/Passive Voice'
      ]
    }
  ];

  return (
    <div className="tcs-aptitude-container max-w-5xl mx-auto py-4">

      {/* ======== PREMIUM RESET CONFIRMATION MODAL ======== */}
      <AnimatePresence>
        {showResetConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)',
              padding: '1rem'
            }}
            onClick={() => setShowResetConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: '420px', width: '100%',
                background: 'rgba(12,14,28,0.95)',
                border: '1px solid rgba(239,68,68,0.25)',
                borderRadius: '20px', padding: '2rem',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6), 0 0 40px rgba(239,68,68,0.08)'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ padding: '0.6rem', borderRadius: '12px', background: 'rgba(239,68,68,0.12)' }}>
                  <AlertTriangle size={22} style={{ color: '#f87171' }} className="animate-pulse" />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'hsl(var(--foreground))', letterSpacing: '-0.01em' }}>Reset All Aptitude Progress?</h3>
              </div>

              {/* Body */}
              <div style={{ margin: '1rem 0', lineHeight: 1.7 }}>
                <p style={{ color: 'hsl(var(--muted-foreground))', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
                  Are you really sure you want to reset everything? This will permanently erase:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '1.25rem', color: 'rgba(255,255,255,0.75)', fontSize: '0.78rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li>All <strong style={{ color: '#60a5fa' }}>Quantitative Aptitude</strong> day progress &amp; scores</li>
                  <li>All <strong style={{ color: '#c084fc' }}>Logical Reasoning</strong> day progress &amp; scores</li>
                  <li>All <strong style={{ color: '#34d399' }}>Verbal Ability</strong> day progress &amp; scores</li>
                  <li>All 10-hour cooldown timers across every day</li>
                </ul>
                <p style={{ marginTop: '1rem', fontSize: '0.72rem', color: '#f87171', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <AlertTriangle size={12} />
                  <span>This action is permanent and cannot be undone.</span>
                </p>
              </div>

              {/* Footer Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  style={{
                    padding: '0.55rem 1.25rem', borderRadius: '10px',
                    background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
                    color: 'hsl(var(--muted-foreground))', fontSize: '0.78rem', fontWeight: 700,
                    cursor: 'pointer', transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
                >
                  Cancel
                </button>
                <button
                  onClick={executeResetAptitudeProgress}
                  style={{
                    padding: '0.55rem 1.25rem', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                    border: '1px solid rgba(239,68,68,0.5)',
                    color: '#fff', fontSize: '0.78rem', fontWeight: 800,
                    cursor: 'pointer', transition: 'all 0.2s ease',
                    boxShadow: '0 4px 16px rgba(239,68,68,0.25)'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 6px 24px rgba(239,68,68,0.45)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(239,68,68,0.25)'; }}
                >
                  Reset Everything
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      
      {/* ======================================================== */}
      {/* CATEGORIES LOBBY VIEW */}
      {/* ======================================================== */}
      {currentScreen === 'lobby' && (
        <div className="lobby-view-wrapper">
          {/* PREMIUM HEADER */}
          <div className="glass-panel" style={{padding:'2rem', marginBottom:'1.75rem', textAlign:'left', background:'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(124,58,237,0.35) 100%)', border:'1px solid rgba(139,92,246,0.4)', boxShadow:'0 8px 32px rgba(124,58,237,0.15)'}}>
            <div style={{display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'0.75rem'}}>
              <span style={{fontSize:'0.65rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', padding:'0.3rem 0.75rem', borderRadius:'99px', background:'rgba(16,185,129,0.15)', color:'#34d399', border:'1px solid rgba(16,185,129,0.3)'}}>Practice Worksheets</span>
            </div>
            <h1 className="text-gradient" style={{fontSize:'2rem', fontWeight:900, letterSpacing:'-0.02em', lineHeight:1.2, marginBottom:'0.5rem'}}>
              TCS Aptitude & Reasoning Prep
            </h1>
            <p style={{color:'hsl(var(--muted-foreground))', fontSize:'0.9rem', lineHeight:1.65, maxWidth:'650px'}}>
              Enhance your problem-solving speeds and logic reasoning limits. Complete topic-wise MCQ modules mirroring actual TCS NQT non-programming formats.
            </p>
          </div>

          {/* PREMIUM DAY SELECTION BAR */}
          <div className="glass-panel" style={{padding:'1.5rem 1.75rem', marginBottom:'1.75rem', textAlign:'left', border:'1px solid rgba(139,92,246,0.12)', background:'rgba(10,12,22,0.7)', backdropFilter:'blur(20px)'}}>
            <div style={{display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'1rem'}}>
              <div style={{padding:'0.45rem', borderRadius:'8px', background:'rgba(139,92,246,0.12)'}}>
                <Brain size={14} style={{color:'hsl(var(--primary))'}} />
              </div>
              <span style={{fontSize:'0.7rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:'hsl(var(--primary))'}}>Select Prep Day (1 – 75)</span>
            </div>
            
            <div style={{display:'flex', gap:'0.5rem', overflowX:'auto', paddingBottom:'0.5rem'}}>
              {Array.from({ length: 75 }, (_, i) => i + 1).map((d) => {
                const isSelected = selectedDay === d;
                const overallStatus = getOverallDayStatus(d);
                
                let btnBg = 'rgba(15,15,25,0.6)';
                let btnBorder = '1.5px solid rgba(255,255,255,0.07)';
                let btnColor = '#64748b';
                let btnShadow = 'none';
                let btnOpacity = 1;
                let btnCursor = 'pointer';

                if (isSelected) {
                  btnBg = 'linear-gradient(135deg, #7c3aed, #6d28d9)';
                  btnBorder = '1.5px solid rgba(139,92,246,0.65)';
                  btnColor = '#fff';
                  btnShadow = '0 0 14px rgba(139,92,246,0.5)';
                } else if (overallStatus === 'completed') {
                  btnBg = 'rgba(16,185,129,0.1)';
                  btnBorder = '1.5px solid rgba(16,185,129,0.3)';
                  btnColor = '#34d399';
                } else if (overallStatus === 'locked') {
                  btnOpacity = 0.35;
                  btnCursor = 'not-allowed';
                }

                return (
                  <button
                    key={d}
                    disabled={overallStatus === 'locked' && !isSelected}
                    onClick={() => setSelectedDay(d)}
                    style={{
                      padding:'0.45rem 0.75rem', borderRadius:'8px',
                      fontSize:'0.72rem', fontFamily:'monospace', fontWeight:700,
                      background: btnBg, border: btnBorder, color: btnColor,
                      boxShadow: btnShadow, opacity: btnOpacity, cursor: btnCursor,
                      flexShrink:0, display:'flex', alignItems:'center', gap:'0.3rem',
                      transition:'all 0.2s ease', whiteSpace:'nowrap'
                    }}
                  >
                    {overallStatus === 'locked' && <Lock size={9} />}
                    {overallStatus === 'completed' && <CheckCircle size={9} />}
                    <span>Day {d}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* TWO-COLUMN GRID: MAIN CONTENT + SIDEBAR */}
          <div className="aptitude-dashboard-layout">
            {/* LEFT: Main Content */}
            <div>
              {/* SECTION TITLE FOR CATEGORIES */}
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.25rem', flexWrap:'wrap', gap:'0.5rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'0.5rem'}}>
                  <span style={{fontSize:'0.85rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', color:'hsl(var(--foreground))'}}>Day {selectedDay} Practice Modules</span>
                  <span style={{fontSize:'0.7rem', color:'hsl(var(--muted-foreground))', fontWeight:600}}>(3 Modules • 30 Total Questions)</span>
                </div>
                <span style={{fontSize:'0.7rem', color:'hsl(var(--primary))', fontWeight:700}}>Select module below to begin</span>
              </div>

              {/* STACKED FULL-WIDTH CATEGORY CARDS WITH CONCEPTS */}
              <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const statusInfo = getAptitudeDayStatus(selectedDay, cat.title);

              // Determine card gradient styles
              let cardBg = cat.gradientBg;
              let cardBorder = cat.gradientBorder;
              let footerText = `Start Day ${selectedDay} ${cat.title} Sheet (10 Qs)`;
              let footerColor = cat.accentColor;
              let cardCursor = 'pointer';
              let cardOpacity = 1;
              let clickHandler = () => startPractice(cat.title);

              // Badge
              let badgeBg = cat.badgeGradient;
              let badgeColor = cat.badgeColor;
              let badgeText = `Day ${selectedDay} • 10 Qs`;

              // Icon style
              let iconBg = cat.badgeGradient;
              let iconColor = cat.badgeColor;

              if (statusInfo.status === 'completed') {
                cardBorder = '1px solid rgba(16,185,129,0.45)';
                cardBg = 'rgba(13, 17, 28, 0.75)';
                footerText = 'Completed! Retry Worksheet';
                footerColor = '#34d399';
                badgeBg = 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(20,184,166,0.25))'; 
                badgeColor = '#34d399'; 
                badgeText = `Score: ${statusInfo.score}%`;
                iconColor = '#34d399';
                iconBg = 'linear-gradient(135deg, rgba(16,185,129,0.25), rgba(20,184,166,0.25))';
              } else if (statusInfo.status === 'cooldown') {
                cardBorder = '1px solid rgba(245,158,11,0.35)';
                cardBg = 'rgba(13, 17, 28, 0.75)';
                cardOpacity = 0.85; cardCursor = 'not-allowed';
                footerText = `Cooldown: ${formatCooldown(statusInfo.remainingTime)}`;
                footerColor = '#fbbf24';
                badgeBg = 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.2))'; 
                badgeColor = '#fbbf24'; 
                badgeText = 'Cooldown';
                iconColor = '#fbbf24';
                iconBg = 'linear-gradient(135deg, rgba(245,158,11,0.2), rgba(217,119,6,0.2))';
                clickHandler = () => {};
              } else if (statusInfo.status === 'locked') {
                cardBorder = '1px solid rgba(255,255,255,0.06)';
                cardBg = 'rgba(255,255,255,0.02)';
                cardOpacity = 0.45; cardCursor = 'not-allowed';
                footerText = `Locked (Complete Day ${selectedDay - 1} first)`;
                footerColor = '#64748b';
                badgeBg = 'rgba(255,255,255,0.06)'; badgeColor = '#64748b'; badgeText = 'Locked';
                iconColor = '#475569';
                iconBg = 'rgba(255,255,255,0.06)';
                clickHandler = () => {};
              }

              return (
                <div 
                  key={cat.id}
                  onClick={clickHandler}
                  className="glass-panel"
                  style={{
                    padding:'1.85rem 2.25rem', display:'flex', flexDirection:'column', gap:'1.35rem',
                    cursor: cardCursor, opacity: cardOpacity,
                    background: cardBg, border: cardBorder, textAlign:'left',
                    transition:'all 0.25s cubic-bezier(0.4,0,0.2,1)', position:'relative',
                    borderRadius: '18px',
                    boxShadow: statusInfo.status === 'unlocked' ? `0 8px 25px ${cat.accentColor}15` : 'none'
                  }}
                  onMouseEnter={(e) => { 
                    if (cardCursor === 'pointer') { 
                      e.currentTarget.style.transform = 'translateY(-4px)'; 
                      e.currentTarget.style.boxShadow = `0 16px 40px ${cat.accentColor}30`; 
                    }
                  }}
                  onMouseLeave={(e) => { 
                    if (cardCursor === 'pointer') {
                      e.currentTarget.style.transform = 'translateY(0)'; 
                      e.currentTarget.style.boxShadow = `0 8px 25px ${cat.accentColor}15`; 
                    }
                  }}
                >
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', flexWrap:'wrap', gap:'1rem'}}>
                    <div style={{display:'flex', alignItems:'center', gap:'1rem'}}>
                      <div style={{padding:'0.9rem', borderRadius:'14px', background:iconBg, border:`1px solid ${badgeColor}35`, flexShrink:0}}>
                        {statusInfo.status === 'locked' ? (
                          <Lock size={24} style={{color:iconColor}} />
                        ) : statusInfo.status === 'cooldown' ? (
                          <AlertTriangle size={24} style={{color:iconColor}} />
                        ) : (
                          <Icon size={24} style={{color:iconColor}} />
                        )}
                      </div>
                      <div>
                        <h3 style={{fontSize:'1.25rem', fontWeight:800, letterSpacing:'-0.01em', marginBottom:'0.25rem'}}>{cat.title}</h3>
                        <p style={{fontSize:'0.82rem', color:'hsl(var(--muted-foreground))', lineHeight:1.55}}>{cat.desc}</p>
                      </div>
                    </div>

                    <span style={{
                      fontSize:'0.75rem', fontWeight:800, fontFamily:'monospace',
                      padding:'0.4rem 0.95rem', borderRadius:'99px',
                      background:badgeBg, color:badgeColor,
                      border:`1px solid ${badgeColor}40`, flexShrink:0,
                      boxShadow: `0 0 12px ${badgeColor}20`
                    }}>{badgeText}</span>
                  </div>

                  {/* TOPICS & CONCEPTS COVERED */}
                  <div style={{paddingTop:'0.85rem', borderTop:'1px solid rgba(255,255,255,0.07)'}}>
                    <span style={{fontSize:'0.68rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', color:'hsl(var(--muted-foreground))', display:'block', marginBottom:'0.65rem'}}>
                      Day {selectedDay} Concepts &amp; Topics:
                    </span>
                    <div style={{display:'flex', flexWrap:'wrap', gap:'0.45rem'}}>
                      {cat.topics.map((t, tidx) => (
                        <span 
                          key={tidx}
                          style={{
                            fontSize:'0.72rem', fontWeight:600, padding:'0.28rem 0.65rem',
                            borderRadius:'8px', background:`${cat.accentColor}12`,
                            border:`1px solid ${cat.accentColor}25`, color: cat.badgeColor
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div style={{paddingTop:'0.85rem', borderTop:'1px solid rgba(255,255,255,0.07)', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <span style={{fontSize:'0.88rem', fontWeight:800, color:footerColor}}>{footerText}</span>
                    <div style={{display:'flex', alignItems:'center', gap:'0.35rem', color:footerColor}}>
                      <span style={{fontSize:'0.78rem', fontWeight:800}}>Enter Worksheet</span>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              );
                })}
              </div>
            </div>

            {/* RIGHT: SIDEBAR — Challenge Settings */}
            <div style={{display:'flex', flexDirection:'column', gap:'1.5rem'}}>
              {/* ===== CHALLENGE SETTINGS PANEL ===== */}
              <div className="glass-panel" style={{padding:'1.75rem', display:'flex', flexDirection:'column', gap:'1.25rem'}}>
                <div style={{display:'flex', alignItems:'center', gap:'0.65rem', paddingBottom:'1rem', borderBottom:'1px solid rgba(255,255,255,0.07)'}}>
                  <div style={{padding:'0.6rem', borderRadius:'10px', background:'rgba(139,92,246,0.12)'}}>
                    <Settings size={18} style={{color:'hsl(var(--primary))'}} />
                  </div>
                  <div>
                    <h3 style={{fontWeight:800, fontSize:'0.95rem', letterSpacing:'-0.01em'}}>Challenge Settings</h3>
                    <span style={{fontSize:'0.7rem', color:'hsl(var(--muted-foreground))'}}>Progression & reset controls</span>
                  </div>
                </div>

                {/* Info about progress */}
                <div style={{
                  padding:'0.85rem 1rem', borderRadius:'10px',
                  background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.06)'
                }}>
                  <div style={{display:'flex', flexDirection:'column', gap:'0.5rem'}}>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span style={{fontSize:'0.75rem', color:'hsl(var(--muted-foreground))', fontWeight:600}}>Completed Sessions</span>
                      <span style={{fontSize:'0.75rem', fontWeight:800, color:'#34d399', fontFamily:'monospace'}}>
                        {Object.keys(progress).reduce((count, cat) => {
                          const catProg = progress[cat] || {};
                          return count + Object.values(catProg).filter(d => d.status === 'completed').length;
                        }, 0)} total
                      </span>
                    </div>
                    <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <span style={{fontSize:'0.75rem', color:'hsl(var(--muted-foreground))', fontWeight:600}}>Current Day</span>
                      <span style={{fontSize:'0.75rem', fontWeight:800, color:'hsl(var(--primary))', fontFamily:'monospace'}}>Day {selectedDay}</span>
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <div style={{paddingTop:'1rem', borderTop:'1px solid rgba(255,255,255,0.06)', marginTop:'0.25rem'}}>
                  <button 
                    type="button"
                    onClick={() => setShowResetConfirm(true)}
                    className="premium-reset-btn"
                    style={{
                      width:'100%', padding:'0.78rem 1rem',
                      display:'flex', alignItems:'center', justifyContent:'center', gap:'0.5rem',
                      fontSize:'0.82rem', fontWeight:800, borderRadius:'10px',
                      cursor:'pointer'
                    }}
                  >
                    <RotateCcw size={15} />
                    <span>Reset Course Progress</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* PRACTICE DECK VIEW */}
      {/* ======================================================== */}
      {currentScreen === 'practice' && deck.length > 0 && (
        <div style={{maxWidth:'48rem', margin:'0 auto'}}>
          {/* Premium Practice Header */}
          <div className="glass-panel" style={{padding:'1.25rem 1.75rem', marginBottom:'1.75rem', display:'flex', justifyContent:'space-between', alignItems:'center', border:'1px solid rgba(139,92,246,0.12)', background:'rgba(10,12,22,0.7)'}}>
            <button className="back-lobby-btn" onClick={quitPractice} style={{display:'flex', alignItems:'center', gap:'0.4rem', background:'none', border:'none', color:'hsl(var(--muted-foreground))', cursor:'pointer', fontSize:'0.8rem', fontWeight:600}}>
              <ArrowLeft size={15} />
              <span>Exit Session</span>
            </button>
            <span style={{fontSize:'0.75rem', fontWeight:700, fontFamily:'monospace', color:'hsl(var(--muted-foreground))'}}>
              {activeCategory} : {currentQIdx + 1} of {deck.length}
            </span>
            <div style={{width:'8rem', height:'6px', background:'rgba(255,255,255,0.06)', borderRadius:'99px', overflow:'hidden'}}>
              <div style={{height:'100%', background:'hsl(var(--primary))', borderRadius:'99px', width:`${((currentQIdx + 1) / deck.length) * 100}%`, transition:'width 0.4s ease', boxShadow:'0 0 8px rgba(139,92,246,0.4)'}}></div>
            </div>
          </div>

          {/* Premium Question Card */}
          <div className="glass-panel" style={{padding:'2.5rem', marginBottom:'1.5rem', display:'flex', flexDirection:'column', gap:'1.5rem', textAlign:'left'}}>
            <div>
              <div style={{display:'flex', alignItems:'center', gap:'0.6rem', marginBottom:'1rem'}}>
                <span className={`badge badge-${deck[currentQIdx].difficulty.toLowerCase()}`} style={{fontSize:'0.65rem', padding:'0.25rem 0.7rem'}}>
                  {deck[currentQIdx].difficulty}
                </span>
                <span style={{fontSize:'0.65rem', color:'hsl(var(--muted-foreground))', fontFamily:'monospace', fontWeight:600}}>
                  Topic: {deck[currentQIdx].sub_topic}
                </span>
              </div>
              <h2 style={{fontSize:'1.15rem', fontWeight:700, lineHeight:1.7}}>
                {deck[currentQIdx].question}
              </h2>
            </div>

            {/* Options grid with glowing selection and hover */}
            <div style={{display:'flex', flexDirection:'column', gap:'0.85rem', marginTop:'0.5rem'}}>
              {deck[currentQIdx].options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrectOption = idx === deck[currentQIdx].answer;
                
                // Default Styles
                let btnBg = 'rgba(15, 15, 25, 0.6)';
                let btnBorder = '1.5px solid rgba(255, 255, 255, 0.08)';
                let btnColor = '#e2e8f0';
                let btnShadow = 'none';
                let btnTransform = 'none';
                let bulletBg = 'rgba(255, 255, 255, 0.08)';
                let bulletColor = '#94a3b8';
                let bulletBorder = '1px solid rgba(255, 255, 255, 0.1)';

                if (isSelected) {
                  btnBg = 'linear-gradient(135deg, rgba(124, 58, 237, 0.22), rgba(109, 40, 217, 0.35))';
                  btnBorder = '2px solid #8b5cf6';
                  btnColor = '#ffffff';
                  btnShadow = '0 0 20px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)';
                  bulletBg = 'linear-gradient(135deg, #7c3aed, #6d28d9)';
                  bulletColor = '#ffffff';
                  bulletBorder = 'none';
                }

                if (checkedAnswer) {
                  if (isCorrectOption) {
                    btnBg = 'rgba(16, 185, 129, 0.18)';
                    btnBorder = '2px solid #10b981';
                    btnColor = '#34d399';
                    btnShadow = '0 0 20px rgba(16, 185, 129, 0.35)';
                    bulletBg = '#10b981';
                    bulletColor = '#ffffff';
                    bulletBorder = 'none';
                  } else if (isSelected) {
                    btnBg = 'rgba(239, 68, 68, 0.18)';
                    btnBorder = '2px solid #ef4444';
                    btnColor = '#f87171';
                    btnShadow = '0 0 20px rgba(239, 68, 68, 0.35)';
                    bulletBg = '#ef4444';
                    bulletColor = '#ffffff';
                    bulletBorder = 'none';
                  } else {
                    btnBg = 'rgba(10, 10, 15, 0.3)';
                    btnBorder = '1px solid rgba(255, 255, 255, 0.03)';
                    btnColor = '#475569';
                    bulletBg = 'rgba(255, 255, 255, 0.03)';
                    bulletColor = '#334155';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={checkedAnswer}
                    onClick={() => handleOptionSelect(idx)}
                    style={{
                      width:'100%', padding:'1rem 1.25rem', borderRadius:'12px',
                      display:'flex', alignItems:'center', gap:'1rem', textAlign:'left',
                      background: btnBg, border: btnBorder, color: btnColor,
                      boxShadow: btnShadow, cursor: checkedAnswer ? 'default' : 'pointer',
                      transition:'all 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
                      outline:'none', position:'relative', overflow:'hidden'
                    }}
                    onMouseEnter={(e) => {
                      if (!checkedAnswer && !isSelected) {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.12)';
                        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.45)';
                        e.currentTarget.style.boxShadow = '0 0 16px rgba(139, 92, 246, 0.2)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!checkedAnswer && !isSelected) {
                        e.currentTarget.style.background = btnBg;
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                        e.currentTarget.style.boxShadow = btnShadow;
                        e.currentTarget.style.transform = 'translateY(0)';
                      }
                    }}
                  >
                    <div style={{
                      width:'1.8rem', height:'1.8rem', borderRadius:'8px',
                      display:'flex', alignItems:'center', justifyCenter:'center',
                      fontWeight:800, fontSize:'0.8rem', flexShrink:0,
                      background: bulletBg, color: bulletColor, border: bulletBorder,
                      transition:'all 0.2s ease', lineHeight:1,
                      alignItems:'center', justifyContent:'center'
                    }}>
                      {String.fromCharCode(65 + idx)}
                    </div>

                    <span style={{fontSize:'0.9rem', fontWeight: isSelected ? 700 : 500, lineHeight:1.5, flexGrow:1}}>
                      {opt}
                    </span>
                    
                    {checkedAnswer && isCorrectOption && (
                      <CheckCircle size={20} style={{color:'#10b981', flexShrink:0}} />
                    )}
                    {checkedAnswer && isSelected && !isCorrectOption && (
                      <XCircle size={20} style={{color:'#ef4444', flexShrink:0}} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Submit / Next Button Bar */}
            <div className="action-button-bar flex justify-end mt-4 pt-4 border-t border-[hsl(var(--card-border)/0.2)]">
              {!checkedAnswer ? (
                <button
                  disabled={selectedOption === null}
                  onClick={handleCheckAnswer}
                  className="btn-primary px-8 justify-center disabled:opacity-50"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="btn-primary px-8 justify-center"
                >
                  <span>{currentQIdx < deck.length - 1 ? 'Next Question' : 'Finish worksheet'}</span>
                  <ChevronRight size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Explanation panel slides open */}
          <AnimatePresence>
            {checkedAnswer && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                className="explanation-box-card glass-panel p-6 border-l-4 border-l-primary bg-primary/5 text-left"
              >
                <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                  <Sparkles size={14} />
                  <span>Mathematical Proof & Explanation</span>
                </h4>
                <p className="text-xs text-foreground/90 leading-relaxed whitespace-pre-line">
                  {deck[currentQIdx].explanation}
                </p>
                <div className="mt-4 text-[10px] text-muted-foreground font-mono">
                  Drive Years Seen: {deck[currentQIdx].years_seen.join(', ')}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================================== */}
      {/* SUMMARY STATS VIEW */}
      {/* ======================================================== */}
      {currentScreen === 'summary' && (() => {
        const accuracy = Math.round((score / deck.length) * 100);
        let remark = "Average";
        let remarkColor = "text-amber-400";
        let remarkBg = "bg-amber-500/10 border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]";
        if (accuracy >= 90) {
          remark = "Excellent";
          remarkColor = "text-green-400";
          remarkBg = "bg-green-500/10 border-green-500/25 shadow-[0_0_12px_rgba(34,197,94,0.15)]";
        } else if (accuracy >= 70) {
          remark = "Good";
          remarkColor = "text-blue-400";
          remarkBg = "bg-blue-500/10 border-blue-500/25 shadow-[0_0_12px_rgba(59,130,246,0.15)]";
        } else if (accuracy >= 50) {
          remark = "Average";
          remarkColor = "text-amber-400";
          remarkBg = "bg-amber-500/10 border-amber-500/25 shadow-[0_0_12px_rgba(245,158,11,0.15)]";
        } else {
          remark = "Poor";
          remarkColor = "text-red-400";
          remarkBg = "bg-red-500/10 border-red-500/25 shadow-[0_0_12px_rgba(239,68,68,0.15)]";
        }

        return (
          <div className="summary-view-wrapper max-w-3xl mx-auto my-12">
            <div className="glass-panel p-8 text-center max-w-md mx-auto mb-10">
              <Trophy size={48} className="mx-auto text-yellow mb-3 animate-bounce" />
              <h2 className="text-2xl font-bold mb-2">Practice Complete!</h2>
              <p className="text-xs text-muted-foreground mb-6">You have completed the {activeCategory} prep deck.</p>

              <div className="circle-score-display p-6 rounded-full border-4 border-primary bg-primary/5 inline-flex flex-col items-center justify-center mb-5">
                <span className="text-4xl font-extrabold">{score}</span>
                <span className="text-muted-foreground text-xs font-mono">/ {deck.length} Correct</span>
              </div>

              {/* Performance Remark Badge */}
              <div className={`inline-flex items-center gap-1.5 px-4.5 py-2 rounded-full border text-xs font-extrabold tracking-wide uppercase mb-6 ${remarkBg} ${remarkColor}`}>
                <Sparkles size={12} />
                <span>Performance: {remark} ({accuracy}%)</span>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => startPractice(activeCategory)}
                  className="btn-secondary flex-1 justify-center"
                >
                  <RefreshCw size={14} />
                  <span>Retry Deck</span>
                </button>
                <button
                  onClick={() => {
                    setCurrentScreen('lobby');
                    setActiveCategory(null);
                  }}
                  className="btn-primary flex-1 justify-center"
                >
                  <span>Back to Lobby</span>
                </button>
              </div>
            </div>

            {/* Questions Review & Explanations */}
            <div className="text-left mt-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-3">
                <BookOpen className="text-primary" size={18} />
                <span>Questions Review & Detailed Explanations</span>
              </h3>
              
              <div className="flex flex-col gap-6">
                {deck.map((q, qIdx) => {
                  const sessionAns = sessionAnswers.find(sa => sa.questionId === q.id);
                  const selectedIdx = sessionAns ? sessionAns.selectedIndex : null;
                  const isCorrect = sessionAns ? sessionAns.isCorrect : false;

                  return (
                    <div key={q.id} className="glass-panel p-6 border border-white/5 relative bg-black/25">
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className="text-xs font-mono font-bold text-muted-foreground uppercase">
                          Question {qIdx + 1}
                        </span>
                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isCorrect ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                        }`}>
                          {isCorrect ? 'Correct' : 'Incorrect'}
                        </span>
                      </div>

                      <p className="text-sm font-bold text-foreground mb-4 whitespace-pre-line leading-relaxed">
                        {q.question}
                      </p>

                      {/* Options list */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
                        {q.options.map((opt, optIdx) => {
                          const isSelected = selectedIdx === optIdx;
                          const isRightAnswer = q.answer === optIdx;

                          let optStyle = "border-white/5 bg-secondary/10 text-muted-foreground";
                          if (isRightAnswer) {
                            optStyle = "border-green-500/30 bg-green-500/10 text-green-400 font-semibold";
                          } else if (isSelected && !isCorrect) {
                            optStyle = "border-red-500/30 bg-red-500/10 text-red-400 font-semibold";
                          }

                          return (
                            <div
                              key={optIdx}
                              className={`p-3 rounded-lg border text-xs flex items-center justify-between ${optStyle}`}
                            >
                              <span>{opt}</span>
                              <div className="flex items-center gap-1.5">
                                {isSelected && <span className="text-[10px] uppercase font-bold tracking-wide opacity-80">(Your Choice)</span>}
                                {isRightAnswer && <span className="text-[10px] uppercase font-bold tracking-wide text-green">(Correct)</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Detailed explanation */}
                      <div className="p-4 rounded-lg bg-primary/5 border-l-4 border-primary">
                        <h5 className="text-xs font-bold text-primary mb-2 flex items-center gap-1.5">
                          <Sparkles size={12} />
                          <span>Explanation</span>
                        </h5>
                        <p className="text-xs text-muted-foreground/90 whitespace-pre-line leading-relaxed">
                          {q.explanation}
                        </p>
                        <div className="mt-3 text-[10px] font-mono text-muted-foreground/50">
                          Drive Years Seen: {q.years_seen.join(', ')}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      <style>{`
        .tcs-aptitude-container {
          color: hsl(var(--foreground));
        }

        .text-gradient {
          background: linear-gradient(135deg, #e2e8f0 0%, #a78bfa 50%, #7c3aed 100%) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
        }

        .hover-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .hover-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px hsl(var(--primary) / 0.15) !important;
          border-color: hsl(var(--primary) / 0.4) !important;
        }

        .options-grid {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .option-btn {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 1.15rem 1.5rem;
          background: hsl(var(--secondary) / 0.2);
          border: 1px solid hsl(var(--card-border) / 0.5);
          border-radius: 0.75rem;
          color: hsl(var(--foreground));
          cursor: pointer;
          gap: 1rem;
          transition: var(--transition);
          text-align: left;
        }

        .option-btn:hover:not(:disabled) {
          background: hsl(var(--secondary) / 0.5);
          border-color: hsl(var(--primary) / 0.4);
        }

        .option-selector-bullet {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 1.8rem;
          height: 1.8rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 0.85rem;
          flex-shrink: 0;
          transition: var(--transition);
        }

        .back-lobby-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: transparent;
          border: none;
          color: hsl(var(--muted-foreground));
          cursor: pointer;
          transition: var(--transition);
        }
        
        .back-lobby-btn:hover {
          color: white;
        }

        .circle-score-display {
          width: 120px;
          height: 120px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }

        .aptitude-dashboard-layout {
          display: grid;
          grid-template-columns: 3fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .aptitude-dashboard-layout {
            grid-template-columns: 1fr;
          }
        }

        /* Premium Reset Course Button */
        .premium-reset-btn {
          position: relative !important;
          background: rgba(239, 68, 68, 0.08) !important;
          color: #ef4444 !important;
          border: 1px solid rgba(239, 68, 68, 0.3) !important;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.03), inset 0 0 8px rgba(239, 68, 68, 0.03) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }

        .premium-reset-btn:hover {
          background: rgba(239, 68, 68, 0.18) !important;
          border-color: rgba(239, 68, 68, 0.7) !important;
          color: #fca5a5 !important;
          box-shadow: 0 0 20px rgba(239, 68, 68, 0.3), inset 0 0 15px rgba(239, 68, 68, 0.1) !important;
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.4) !important;
        }
      `}</style>
    </div>
  );
}
