window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const tiredMoment = params.get('tiredMoment'); // Récupère la réponse à la question sur la fatigue
    const stressFactors = params.get('stressFactors'); // Récupère la réponse à la question sur les facteurs de stress
    const tiringJobs = params.get('tiringJobs'); // Récupère la réponse à la question sur les postes fatigants

    const wakeupTime = params.get('wakeupTime');
    const freshnessLevel = parseInt(params.get('freshnessLevel'), 10);
    const substanceUse = params.get('substanceUse') === "on" ? 1 : 0;
    const sleepDisturbance = params.get('sleepDisturbance') === "on" ? 1 : 0;
    const age = parseInt(params.get('age'), 10);
    const workHours = parseInt(params.get('workHours'), 10);

    // Calculate fatigue score
    const timeScore = calculateTimeScore(wakeupTime);
    const substanceScore = substanceUse * 12.1;
    const disturbanceScore = sleepDisturbance * 12.1;
    const freshnessScore = (10 - freshnessLevel) * 5.2;
    let ageScore;
    if (age >= 20 && age <= 30) {
        ageScore = 5;
    } else if (age > 30 && age <= 40) {
        ageScore = 10;
    } else {
        ageScore = 20;
    }
    const workScore = workHours > 8 ? (workHours - 7) * 5.1 : 0;

    const totalScore = timeScore + freshnessScore + substanceScore + disturbanceScore + ageScore + workScore;
    const fatiguePercent = Math.min(100, totalScore).toFixed(2);

    
    document.getElementById('advice').innerHTML = `<h2>Niveau de Fatigue: ${fatiguePercent}%</h2>`; 
    if (fatiguePercent<70) {
    document.getElementById('tiredMomentDisplay').innerHTML = `<p>Cette personne ne devrait pas avoir beaucoup de tâches à accomplir à ${tiredMoment} ; elle devrait se détendre et s'occuper uniquement des petites tâches</p> <p>En fait il faut que vous trouvez une solution pour le ${stressFactors}</p> <p>Il est préferable que cette personne évite d'occuper le poste de ${tiringJobs}</p>`;}
    else {document.getElementById('tiredMomentDisplay').innerHTML=`<p>Vous devez vous reposer car vous êtes vraiment fatigué et vous etes susceptible de commettre des erreurs au travail.</p>`}
};

function calculateTimeScore(timeStr) {
    const hour = parseInt(timeStr.split(':')[0], 10);
    if (hour < 6) return 30; // Very early wakeup contributes significantly to fatigue
    if (hour < 9) return 10; // Normal wakeup time
    return 0; // Late wakeup does not contribute to fatigue

}