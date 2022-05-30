const verif_format_date = (date_string: string): boolean => {
    const date_split = date_string.split('/');
    if (date_split.length != 3) {
        return (false);
    }
    if (parseInt(date_split[0], 10) <= 0 || parseInt(date_split[0], 10) > 31) {
        return (false);
    }
    if (parseInt(date_split[1], 10) <= 0 || parseInt(date_split[1], 10) > 12) {
        return (false);
    }
    if (date_split[2].length != 4 || parseInt(date_split[2], 10) < new Date().getFullYear()) {
        return (false);
    }
    return (true);
}

const verif_format_time = (time_string: string): boolean => {
    const time_split = time_string.split(':');
    if (time_split.length != 2) {
        return (false);
    }
    console.log(time_string, time_split);
    if (time_split[0].length != 2 || time_split[1].length != 2) {
        return (false);
    }
    if (parseInt(time_string[0], 10) < 0 || parseInt(time_string[0], 10) > 23) {
        return (false);
    }
    if (parseInt(time_string[0], 10) < 0 || parseInt(time_string[0], 10) > 59) {
        return (false);
    }
    return (true);
}

export default {
    verif_format_date,
    verif_format_time,
}