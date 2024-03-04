

const initial ={
    navHeight:0,
    lucid:null
}
export const reducer = (state = initial, action) =>{
    switch(action.type){
        case "handleHeightNav":{
            return {
                ...state,
                navHeight: action.value
            }
        }
        case "handleLucid":{
            return {
                ...state,
                lucid: action.value
            }
        }
        default:
            return state;   
    }
}

export const handleHeightNav = height => {
    return{
        type: "handleHeightNav",
        value: height
    }
}

export const handleLucid = lucid => {
    return{
        type: "handleLucid",
        value: lucid
    }
}
