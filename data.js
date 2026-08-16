const METODOS = {

    v60: {

        id:
            "v60",

        nombre:
            "V60",

        subtitulo:
            "Filtrado",

        descripcion:
            "Claridad, control y una extracción limpia construida vertido a vertido.",

        cafeDefault:
            20,

        ratioDefault:
            16,

        temperatura:
            "92–96 °C",

        molienda:
            "Media-fina",

        parametros: {

            bloomMultiplicador:
                3

        },

        ratios: [

            {
                nombre: "INTENSO",
                ratio: 15
            },

            {
                nombre: "BALANCE",
                ratio: 16
            },

            {
                nombre: "SUAVE",
                ratio: 17
            }

        ],

        pasos: [

            {
                nombre:
                    "Bloom",

                tipo:
                    "timer",

                tiempo:
                    45,

                agua:
                    "bloom"
            },

            {
                nombre:
                    "Primer vertido",

                tipo:
                    "timer",

                tiempo:
                    30,

                agua:
                    "acumulado",

                porcentaje:
                    0.5
            },

            {
                nombre:
                    "Segundo vertido",

                tipo:
                    "timer",

                tiempo:
                    30,

                agua:
                    "acumulado",

                porcentaje:
                    0.75
            },

            {
                nombre:
                    "Vertido final",

                tipo:
                    "timer",

                tiempo:
                    35,

                agua:
                    "total"
            },

            {
                nombre:
                    "Drenaje",

                tipo:
                    "timer",

                tiempo:
                    40,

                instruccion:
                    "Deja que el agua termine de atravesar la cama de café."
            }

        ]

    },


    francesa: {

        id:
            "francesa",

        nombre:
            "Prensa Francesa",

        subtitulo:
            "Inmersión",

        descripcion:
            "Una taza con cuerpo, textura y extracción profunda mediante inmersión total.",

        cafeDefault:
            20,

        ratioDefault:
            15,

        temperatura:
            "92–95 °C",

        molienda:
            "Gruesa",

        parametros: {

            bloomMultiplicador:
                3

        },

        ratios: [

            {
                nombre: "INTENSO",
                ratio: 14
            },

            {
                nombre: "BALANCE",
                ratio: 15
            },

            {
                nombre: "SUAVE",
                ratio: 16
            }

        ],

        pasos: [

            {
                nombre:
                    "Agregar agua",

                tipo:
                    "accion",

                agua:
                    "total"
            },

            {
                nombre:
                    "Inmersión",

                tipo:
                    "timer",

                tiempo:
                    240,

                instruccion:
                    "Deja infusionar el café sin presionar el émbolo."
            },

            {
                nombre:
                    "Romper costra",

                tipo:
                    "accion",

                instruccion:
                    "Remueve suavemente la superficie y retira la espuma si lo deseas."
            },

            {
                nombre:
                    "Reposo",

                tipo:
                    "timer",

                tiempo:
                    60,

                instruccion:
                    "Deja que las partículas restantes se depositen."
            },

            {
                nombre:
                    "Prensar",

                tipo:
                    "accion",

                instruccion:
                    "Baja el émbolo lentamente y sirve inmediatamente."
            }

        ]

    },


    aeropress: {

        id:
            "aeropress",

        nombre:
            "AeroPress",

        subtitulo:
            "Presión",

        descripcion:
            "Rápida, compacta y versátil. Una extracción concentrada con gran control.",

        cafeDefault:
            18,

        ratioDefault:
            14,

        temperatura:
            "85–92 °C",

        molienda:
            "Media-fina",

        parametros: {

            bloomMultiplicador:
                3

        },

        ratios: [

            {
                nombre: "INTENSO",
                ratio: 12
            },

            {
                nombre: "BALANCE",
                ratio: 14
            },

            {
                nombre: "SUAVE",
                ratio: 16
            }

        ],

        pasos: [

            {
                nombre:
                    "Preinfusión",

                tipo:
                    "timer",

                tiempo:
                    30,

                agua:
                    "bloom"
            },

            {
                nombre:
                    "Completar agua",

                tipo:
                    "accion",

                agua:
                    "restante"
            },

            {
                nombre:
                    "Infusión",

                tipo:
                    "timer",

                tiempo:
                    60,

                instruccion:
                    "Deja reposar la mezcla manteniendo la cámara estable."
            },

            {
                nombre:
                    "Presionar",

                tipo:
                    "timer",

                tiempo:
                    30,

                instruccion:
                    "Presiona lentamente hasta escuchar el aire al final."
            }

        ]

    },


    moka: {

        id:
            "moka",

        nombre:
            "Moka",

        subtitulo:
            "Presión",

        descripcion:
            "Intensa y directa. Una preparación clásica de cuerpo alto y carácter marcado.",

        cafeDefault:
            18,

        ratioDefault:
            10,

        temperatura:
            "Agua caliente",

        molienda:
            "Media-fina",

        parametros: {

            bloomMultiplicador:
                3

        },

        ratios: [

            {
                nombre: "INTENSO",
                ratio: 9
            },

            {
                nombre: "BALANCE",
                ratio: 10
            },

            {
                nombre: "SUAVE",
                ratio: 11
            }

        ],

        pasos: [

            {
                nombre:
                    "Preparar base",

                tipo:
                    "accion",

                agua:
                    "total"
            },

            {
                nombre:
                    "Agregar café",

                tipo:
                    "accion",

                instruccion:
                    "Llena el filtro sin compactar el café."
            },

            {
                nombre:
                    "Calentar",

                tipo:
                    "accion",

                instruccion:
                    "Pon la moka a fuego bajo con la tapa abierta."
            },

            {
                nombre:
                    "Extracción",

                tipo:
                    "timer",

                tiempo:
                    90,

                instruccion:
                    "Observa el flujo. Retira del calor cuando comience a aclararse."
            },

            {
                nombre:
                    "Detener",

                tipo:
                    "accion",

                instruccion:
                    "Enfría la base para detener la extracción y sirve."
            }

        ]

    }

};
