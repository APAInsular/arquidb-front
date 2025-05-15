const FilterReducer = (state, action) => {
    switch (action.type) {
        // COMPRUEBA QUE SEA SORT_TEXT, SI ES: COGE EL ESTADO Y LO MODIFICA USANDO SORT PARA UN FILTRADO asc o desc 
        // CREAMOS DOS VARIABLES EL A Y B. EL ACTION.KEY ES PARA QUE SEPA QUE PARAMETRO DEL ARRAY ES 
        // POR EJEMPLO person->a.name->action.key, LUEGO HACE LA COMPROBACION Y SI ES ASC O DESC Y LO APILICA 
        // LA COMPARACION ESTRE LOS DOS, COMO YA SABEMOS.  
        case 'SORT_TEXT':
            return {
                ...state,
                data: [...state.data].sort((a, b) => {
                    const textA = a[action.key]?.toUpperCase() || '';
                    const textB = b[action.key]?.toUpperCase() || '';
                    if (action.order === 'asc') return textA.localeCompare(textB);
                    if (action.order === 'desc') return textB.localeCompare(textA);
                    return 0;
                })
            };

        // COMPRUEBA QUE SEA SORT_NUMBER, SI ES: COGE EL ESTADO Y LO MODIFICA USANDO SORT PARA UN FILTRADO asc o desc 
        // CREAMOS DOS VARIABLES EL A Y B. EL ACTION.KEY ES PARA QUE SEPA QUE PARAMETRO DEL ARRAY ES 
        // POR EJEMPLO person->a.id->action.key, LUEGO HACE LA COMPROBACION 
        // Y SI ES ASC Y RESTA DE A A B , SI ES DESC Y RESTA DE B A A
        case 'SORT_NUMBER':
            return {
                ...state,
                data: [...state.data].sort((a, b) => {
                    const numA = parseFloat(a[action.key]) || 0;
                    const numB = parseFloat(b[action.key]) || 0;
                    return action.order === 'asc' ? numA - numB : numB - numA;
                })
            };

        // COMPRUEBA QUE SEA SORT_DATE, SI ES: COGE EL ESTADO Y LO MODIFICA USANDO SORT PARA UN FILTRADO asc o desc 
        // CREAMOS DOS VARIABLES EL A Y B. EL ACTION.KEY ES PARA QUE SEPA QUE PARAMETRO DEL ARRAY ES 
        // POR EJEMPLO person->a.id->action.key, LUEGO HACE LA COMPROBACION 
        // Y SI ES ASC Y RESTA DE A A B , SI ES DESC Y RESTA DE B A A
        case 'SORT_DATE':
            return {
                ...state,
                data: [...state.data].sort((a, b) => {
                    const dateA = new Date(a[action.key]);
                    const dateB = new Date(b[action.key]);
                    return action.order === 'asc' ? dateA - dateB : dateB - dateA;
                })
            };

        // EL DATO NORMAL
        case 'SET_DATA':
            return {
                ...state,
                data: action.payload
            };

        default:
            return state;
    }
};

export default FilterReducer;
