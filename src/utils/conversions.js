export const  convertDifficulty = level => {
    if(level == 'Beginner'){
        return 'easy'
    }
    else if(level == 'Intermediate'){
        return 'medium'
    }
    else{
        return 'hard'
    }
}