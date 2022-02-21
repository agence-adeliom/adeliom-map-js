# Adeliom MAP Js

Dépendance de gestion de Google Maps / Store Locator Adeliom

## Initialisation
```javascript
import AdeliomMap from "./AdeliomMap"

document.addEventListener('DOMContentLoaded', () => {
    const paramsArray = {...};
    const adeliomMap = new AdeliomMap(paramsArray);
});
```
## Options disponibles

### Base

`apiKey (string)` : clé API de la map<br>
`mapSelector (string)` : sélecteur CSS du container de la map<br>
`mapListSelector (string)` : sélecteur CSS du container de la lise des points<br>
`checkMapSize (bool)` : vérifie si la map a bien une hauteur/largeur<br>
`mapDefaultCenter ({lat: x, lng: y})` : centre par défaut de la map<br>
`mapDefaultZoom (int)` : zoom par défaut de la map<br>
`mapProvider (string)` : fournisseur de la map (seulement `google` pour le moment)<br>
`mapShowPlaces (bool)` : afficher ou non les marqueurs de lieux<br>

### Contrôles
`mapEnableZoomButtons (bool)` : afficher ou non les boutons de zoom<br>
`mapEnableStreetView (bool)` : afficher ou non le bouton StreetView<br>
`mapEnableFullscreenButton (bool)` : afficher ou non le bouton plein écran<br>
`mapEnableTypeButtons (bool)` : afficher ou non les boutons de type de map<br>
`mapDisplayScale (bool)` : afficher ou non une échelle graduée au bas de la map<br>

### Markers
`mapMarkers (array)` : tableau des markers à afficher<br>
`mapDisplayMarkers (bool)` : la map doit-elle afficher les marqueurs<br>
`mapCenterMarkerOnClick (bool)` : centre la map sur le marqueur au clic<br>
`mapZoomMarkerOnClick (int|bool)` : zoom la map au clic sur un marqueur<br>
`mapAnimation (string)` : type d'animation de transition entre positions dans la map (smooth / default)<br>
`mapAllowMultipleMarkersSelected (bool)` : si plusieurs marqueurs peuvent être sélectionnés en simultané<br>
`mapMarkerIcon (string)` : URL vers l'icône du marker<br>
`mapMarkerSelectedIcon (string)` : URL vers l'icône sélectionnée du marker<br>

### Infobulles

`mapInfoWindowTemplate (string)` : template HTML de l'infobulle d'un marqueur<br>
`mapDisplayInfoWindows (bool)` : la map doit-elle afficher les infobulles<br>
`mapInfoWindowReplaceWithMarkerData (bool)` : permet de remplacer les données du template par des données du marqueur (
si le marqueur contient une propriété `title`, mettre des balises `{{ title }}` dans le template)<br>

### Liste de points

`mapListEltTemplate (string)` : template HTML d'un élément de la liste des points<br>
`mapListReplaceWithMarkerData (bool)` : permet de remplacer les données du template par des données du marqueur (si le
marqueur contient une propriété `title`, mettre des balises `{{ title }}` dans le template)<br>

### Consentement RGPD

`mapAskForConsent (bool)` : indique si la map doit demander le consentement de l'utilisateur<br>
`mapConsentDefaultValue (bool)` : valeur par défaut pour le consentement _(permet d'initialiser directement la map si
consentement déjà donné)_<br>
`mapConsentButtonMessage (string)` : message affiché dans le bouton de consentement<br>

## Exemples de paramètres :

```
mapDefaultCenter: {
    lat: 48.614782,
    lng: 7.714012
},
mapMarkers: [
    {
        title: 'Agence Adeliom',
        description: 'Agence Digitale',
        coordinates: {
            lat: 48.614782,
            lng: 7.714012,
        },
        icon: 'https://...', // override l'icon par défaut
        selectedIcon: 'https://...', // override l'icon selected par défaut
        infoWindowTemplate: '<div class="map-infowindow-elt">Test template</div>',
        listEltTemplate: 'Test 2',
    },
    {
        title: 'Cathédrale de Strasbourg',
        description: 'Lieu touristique',
        coordinates: {
            lat: 48.581825,
            lng: 7.75093,
        }
    }
],
```

## Événements
Il est possible d'utiliser l'objet `AdeliomMapEvents` afin de récupérer les différents événements disponibles.
```javascript
// Instanciation de l'AdeliomMap
const adeliomMap = new AdeliomMap({});

// Catch d'un événement et exécution de code
adeliomMap.on('eventName', (data) => {
    console.log(data);
});
```

### Marqueurs :

`markerCreated` : Retourne l'instance d'un marqueur Google Maps lorsqu'il vient d'être créé.<br>
`markerDataCreated` : Retourne les données d'un marqueur lorsqu'il vient d'être intégralement créé (marqueur, infobulle
et élément de liste).<br>
`markerClicked` : Retourne les données d'un marqueur lorsque l'on clique dessus.<br>

### Infobulles :

`markerInfoWindowCreated` : Retourne les données d'un marqueur lorsqu'une infobulle a été créée.<br>

### Éléments de liste :

`markerListEltCreated` : Retourne les données d'un marqueur lorsqu'un élément de liste vient d'être créé.<br>

## Fonctions

`_setConsent (bool)` : Permet d'indiquer dynamiquement l'état de consentement de l'utilisateur<br>