/**
 * Schedule Generator Engine (Coding Only)
 * Reusable scheduler that builds a company-specific coding challenge program based on pattern frequency.
 */

export function analyzeTopicWeights(questions) {
  const topicStats = {};

  questions.forEach(q => {
    const topic = q.topic;
    if (!topicStats[topic]) {
      topicStats[topic] = {
        topicName: topic,
        track: q.track,
        questionCount: 0,
        yearsSeen: new Set(),
        totalAppearances: 0,
        questionsList: []
      };
    }

    topicStats[topic].questionCount += 1;
    topicStats[topic].questionsList.push(q);
    
    if (q.years_seen && Array.isArray(q.years_seen)) {
      q.years_seen.forEach(yr => {
        topicStats[topic].yearsSeen.add(yr);
      });
      topicStats[topic].totalAppearances += q.years_seen.length;
    }
  });

  const weights = {};
  Object.keys(topicStats).forEach(topic => {
    const stats = topicStats[topic];
    const uniqueYearsCount = stats.yearsSeen.size;
    const weightScore = parseFloat((uniqueYearsCount + (stats.totalAppearances * 0.1)).toFixed(2));

    weights[topic] = {
      topic,
      track: stats.track,
      uniqueYears: Array.from(stats.yearsSeen).sort((a,b) => b - a),
      appearances: stats.totalAppearances,
      questionCount: stats.questionCount,
      weightScore: weightScore
    };
  });

  return weights;
}

export function generate75DaySchedule(codingQuestions) {
  const weights = analyzeTopicWeights(codingQuestions);

  const PHASES = [
    { track: 'ninja', startDay: 1, endDay: 30, timeLimit: 30 }, // 30 mins for simple code
    { track: 'digital', startDay: 31, endDay: 60, timeLimit: 45 }, // 45 mins for medium code
    { track: 'prime', startDay: 61, endDay: 75, timeLimit: 60 }  // 60 mins for hard code
  ];

  const schedule = [];

  PHASES.forEach(phase => {
    const phaseTrack = phase.track;
    const phaseQs = codingQuestions.filter(q => q.track === phaseTrack);
    
    // Sort topics of this track by weight descending
    const trackTopics = Object.values(weights)
      .filter(w => w.track === phaseTrack)
      .sort((a, b) => b.weightScore - a.weightScore);

    const totalDaysInPhase = phase.endDay - phase.startDay + 1;

    for (let d = 0; d < totalDaysInPhase; d++) {
      const currentDayNumber = phase.startDay + d;
      
      // Determine primary topic by distributing weighted topics
      let primaryTopicInfo = trackTopics[0];
      if (trackTopics.length > 0) {
        const totalWeightScore = trackTopics.reduce((sum, t) => sum + t.weightScore, 0);
        let accumulatedWeight = 0;
        const targetWeightPoint = (d / totalDaysInPhase) * totalWeightScore;

        for (let t = 0; t < trackTopics.length; t++) {
          accumulatedWeight += trackTopics[t].weightScore;
          if (accumulatedWeight >= targetWeightPoint) {
            primaryTopicInfo = trackTopics[t];
            break;
          }
        }
      }

      const primaryTopic = primaryTopicInfo ? primaryTopicInfo.topic : 'General Coding';

      // Select exactly three coding questions for today
      const selectedQuestions = [];
      const topicQs = phaseQs.filter(q => q.topic === primaryTopic);
      const pool = topicQs.length > 0 ? topicQs : phaseQs;

      for (let qIdx = 0; qIdx < 3; qIdx++) {
        let questionItem = null;
        if (pool.length > 0) {
          const idx = (d * 3 + qIdx) % pool.length;
          questionItem = pool[idx];
        } else {
          const fallbackPool = phaseQs.length > 0 ? phaseQs : codingQuestions;
          questionItem = fallbackPool[(d * 3 + qIdx) % fallbackPool.length];
        }
        selectedQuestions.push({
          ...questionItem,
          local_id: `${questionItem.id}_day_${currentDayNumber}_q_${qIdx}`
        });
      }

      const title = `Day ${currentDayNumber}: ${primaryTopic} Challenge`;

      schedule.push({
        day_number: currentDayNumber,
        track: phaseTrack,
        title: title,
        primary_topic: primaryTopic,
        questions: selectedQuestions,
        time_limit: phase.timeLimit
      });
    }
  });

  return schedule;
}
