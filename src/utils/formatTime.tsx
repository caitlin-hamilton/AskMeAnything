export default function formatTime(timeInSeconds: number): string {
    //new Date()/1000
    const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'narrow' });
    const today = new Date()
    const posted = new Date(timeInSeconds)
    const days = today.getUTCDate() - posted.getUTCDate()
    const hours = today.getUTCHours() - posted.getUTCHours()
    const minutes = today.getUTCMinutes() - posted.getUTCMinutes()
    const seconds = today.getUTCSeconds() - posted.getUTCSeconds()
    if (days >= 1){
        return rtf1.format(-days, 'days')
    }
    else if (hours > 1 && minutes <0){
        return rtf1.format(-hours+1, 'hours')
    }
    else if(hours > 1 && minutes > 0){
        return rtf1.format(-hours, 'hours')
    }
    else if(hours === 1 && minutes <=0 && (60+minutes) > 1){
        return rtf1.format(minutes, 'minutes')
    }
    else if((hours === 1 || hours === 0) && minutes <0 && seconds <0){
        return rtf1.format(-(60+seconds), 'seconds')
    }
    else if (minutes >= 1){
        return rtf1.format(-minutes, 'minutes')
    }
    else if(seconds >= 0){
        return rtf1.format(-seconds, 'seconds')
    }
    else if(seconds < 0){
        return rtf1.format(seconds, 'seconds')
    }
    else {
        return 'Unknown'
    }
}