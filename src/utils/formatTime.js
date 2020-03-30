export const formatTime = arg => {
  if ((arg) && (typeof(arg) === 'number') && (arg >= 0)) {
    const seconds = Math.floor(arg%60);
    const mins = Math.floor(arg/60%60);
    const hours = Math.floor(arg/3600);
    const final = [hours, mins, seconds].map( element => `${element+100}`.substring(1));
    return final.join(':');
  } else {
    return null;
  } 
};