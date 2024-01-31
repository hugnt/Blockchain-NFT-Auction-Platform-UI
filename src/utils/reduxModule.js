const initial ={
    navHeight:0
}
export const reducer = (state = initial, action) =>{
    switch(action.type){
        case "handleHeightNav":{
            return {
                ...state,
                navHeight: action.value
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
