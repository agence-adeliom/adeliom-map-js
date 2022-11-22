import {AdeliomMapStyleElement, AdeliomMapStyleElementWithAdditional} from "./AdeliomMapTypes";

export const styleWaterFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#d3d3d3',
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleWaterTextFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [
        {
            color: '#333333',
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleTransit: AdeliomMapStyleElementWithAdditional = {
    featureType: 'transit',
    stylers: [
        {
            visibility: 'off',
        },
        {
            color: '#808080',
        }
    ],
    additionalData: {
        isEnabled: false,
    }
}

export const styleRoadHighwayStroke: AdeliomMapStyleElementWithAdditional = {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#b3b3b3',
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadHighwayFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#ffffff'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadLocalFill: AdeliomMapStyleElementWithAdditional = {
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
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadArterialFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road.arterial',
    elementType: 'geometry.fill',
    stylers: [
        {
            color: '#ffffff'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadArterialStroke: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road.arterial',
    elementType: 'geometry.stroke',
    stylers: [
        {
            color: '#d6d6d6'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadLocalStroke: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road.local',
    elementType: 'geometry.stroke',
    stylers: [
        {
            color: '#d7d7d7'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadTextFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road',
    elementType: 'labels.text.fill',
    stylers: [
        {
            color: '#696969'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleRoadLabelsIcon: AdeliomMapStyleElementWithAdditional = {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [
        {
            visibility: 'off'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const stylePoiFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'poi',
    elementType: 'geometry.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#ebebeb'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const stylePoiLabels: AdeliomMapStyleElementWithAdditional = {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [
        {
            visibility: 'off'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
}

export const stylePoiLabelsIcon: AdeliomMapStyleElementWithAdditional = {
    featureType: 'poi',
    elementType: 'labels.icon',
    stylers: [
        {
            visibility: 'off'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleAdministrative: AdeliomMapStyleElementWithAdditional = {
    featureType: 'administrative',
    elementType: 'geometry',
    stylers: [
        {
            color: '#a7a7a7'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleAdministrativeTextFill: AdeliomMapStyleElementWithAdditional = {
    featureType: 'administrative',
    elementType: 'labels.text.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#737373'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
};

export const styleLandscape: AdeliomMapStyleElementWithAdditional = {
    featureType: 'landscape',
    elementType: 'geometry.fill',
    stylers: [
        {
            visibility: 'on'
        },
        {
            color: '#efefef'
        }
    ],
    additionalData: {
        isEnabled: false,
    }
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
];

export const getAllStyleParams = () => {
    const allStyleParamsFinal: AdeliomMapStyleElement[] = [];

    // Deep copy
    JSON.parse(JSON.stringify(allStyleParams)).forEach((styleParam: AdeliomMapStyleElementWithAdditional) => {
        if (styleParam?.additionalData && styleParam.additionalData.isEnabled) {
            if (styleParam?.additionalData) {
                delete styleParam.additionalData;
            }

            allStyleParamsFinal.push(styleParam);
        }
    });

    return allStyleParamsFinal;
};

export const getBaseStyleParams = (stringify: boolean = false) => {
    if (!stringify) {
        return getAllStyleParams();
    }

    return JSON.stringify(getAllStyleParams());
};

export const initStyleBuilderFields = (onChange: Function | null = null) => {
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

                                if (onChange) {
                                    onChange();
                                }
                            });

                            const fieldContainer = document.createElement('div');

                            const fieldLabel = document.createElement('label');
                            fieldLabel.textContent = ` ${styleParam.featureType} - ${styleParam.elementType}`;

                            const fieldEnabled = document.createElement('input');
                            fieldEnabled.type = 'checkbox';
                            fieldEnabled.style.marginRight = '8px';

                            if (styleParam.additionalData) {
                                fieldEnabled.checked = Boolean(styleParam.additionalData.isEnabled);
                            }

                            fieldEnabled.addEventListener('change', (e) => {
                                if (styleParam.additionalData) {
                                    styleParam.additionalData.isEnabled = (e.target as HTMLInputElement).checked;
                                }

                                if (onChange) {
                                    onChange();
                                }
                            });

                            fieldContainer.appendChild(fieldEnabled);
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