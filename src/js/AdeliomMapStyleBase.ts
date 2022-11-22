import {AdeliomMapStyleElement} from "./AdeliomMapTypes";

export const styleWaterFill: AdeliomMapStyleElement = {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#d3d3d3',
        }
    ]
};

export const styleWaterTextFill: AdeliomMapStyleElement = {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
        {
            color: '#333333',
        }
    ]
};

export const styleTransit: AdeliomMapStyleElement = {
    featureType: 'transit',
    stylers: [
        {
            visibility: 'off',
        },
        {
            color: '#808080',
        }
    ]
}

export const styleRoadHighwayStroke: AdeliomMapStyleElement = {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#b3b3b3',
        }
    ]
};

export const styleRoadHighwayFill: AdeliomMapStyleElement = {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#ffffff'
        }
    ]
};

export const styleRoadLocalFill: AdeliomMapStyleElement = {
    featureType: 'road.local',
    elementType: 'geometry.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#ffffff'
        },
        {
            weight: 1.8
        }
    ]
};

export const styleRoadArterialFill: AdeliomMapStyleElement = {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#ffffff'
        }
    ]
};

export const styleRoadArterialStroke: AdeliomMapStyleElement = {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
        {
            color: '#d6d6d6'
        }
    ]
};

export const styleRoadLocalStroke: AdeliomMapStyleElement = {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
        {
            color: '#d7d7d7'
        }
    ]
};

export const styleRoadTextFill: AdeliomMapStyleElement = {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
        {
            color: '#696969'
        }
    ]
};

export const styleRoadLabelsIcon: AdeliomMapStyleElement = {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
        {
            visibility: 'off'
        }
    ]
};

export const stylePoiFill: AdeliomMapStyleElement = {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#ebebeb'
        }
    ]
};

export const stylePoiLabels: AdeliomMapStyleElement = {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
        {
            visibility: 'off'
        }
    ]
}

export const stylePoiLabelsIcon: AdeliomMapStyleElement = {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
        {
            visibility: 'off'
        }
    ]
};

export const styleAdministrative: AdeliomMapStyleElement = {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
        {
            color: '#a7a7a7'
        }
    ]
};

export const styleAdministrativeTextFill: AdeliomMapStyleElement = {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#737373'
        }
    ]
};

export const styleLandscape: AdeliomMapStyleElement = {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#efefef'
        }
    ]
};

export const allStyleParams = [
    styleWaterFill,
    styleWaterTextFill,
    styleTransit,
    styleRoadHighwayStroke,
    styleRoadHighwayFill,
    styleRoadLocalFill,
    styleRoadArterialFill,
    styleRoadArterialStroke,
    styleRoadLocalStroke,
    styleRoadTextFill,
    styleRoadLabelsIcon,
    stylePoiFill,
    stylePoiLabels,
    stylePoiLabelsIcon,
    styleAdministrative,
    styleAdministrativeTextFill,
    styleLandscape,
]

export const getBaseStyleParams = (stringify: boolean = false) => {
    if (!stringify) {
        return allStyleParams;
    }

    return JSON.stringify(allStyleParams);
};

export const initStyleBuilderFields = () => {
    const fieldsContainer = document.querySelector(`[js-style-color-fields]`);

    if (fieldsContainer) {
        allStyleParams.forEach((styleParam) => {
            if (styleParam?.stylers?.length > 0) {
                styleParam.stylers.forEach((style) => {
                    if (Object.keys(style).findIndex((key) => key === 'color') > -1) {
                        if (style.color) {
                            const newInput = document.createElement('input');
                            newInput.type = 'color';
                            newInput.value = style.color;

                            newInput.addEventListener('change', (e) => {
                                const changedInput = e.target;
                                // @ts-ignore
                                const newColorValue = changedInput.value;

                                if (styleParam.stylers) {
                                    styleParam.stylers.forEach((style) => {
                                        if (style?.color) {
                                            style.color = newColorValue;
                                        }
                                    })
                                }
                            });

                            const fieldContainer = document.createElement('div');
                            const fieldLabel = document.createElement('label');
                            fieldLabel.textContent = ` ${styleParam.featureType} - ${styleParam.elementType}`;

                            fieldContainer.appendChild(newInput);
                            fieldContainer.appendChild(fieldLabel);

                            fieldsContainer.appendChild(fieldContainer);
                        }
                    }
                });
            }
        });
    }
}