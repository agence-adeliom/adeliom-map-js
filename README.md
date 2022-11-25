# Adeliom MAP Js

Dépendance de gestion de Google Maps / Store Locator Adeliom

## Installation

```shell
$ yarn add agence-adeliom/adeliom-map-js
```

## Initialisation

```javascript
import AdeliomMap from "adeliom-map-js/src/js/AdeliomMap";

document.addEventListener('DOMContentLoaded', () => {
    const paramsArray = {...};
    const adeliomMap = new AdeliomMap(paramsArray);
});
```

## Éléments de DOM

`[js-map]` : container de la map<br>
`[js-map-list]` : container de la liste d'éléments<br>
`[js-map-list-id]` : élément de liste généré statiquement (fournir la propriété `listEltId` au marker associé)<br>

## Options disponibles

### Base

`apiKey (string)` : clé API de la map<br>
`mapSelector (string)` : sélecteur CSS du container de la map<br>
`mapListSelector (string)` : sélecteur CSS du container de la lise des points<br>
`mapCustomZoomMinusSelector` : sélecteur CSS d'un élément allant servir de bouton zoom -<br>
`mapCustomZoomPlusSelector` sélecteur CSS d'un élément allant servir de bouton zoom +<br>
`placesSelector (string)` : sélecteur CSS de l'input utilisé pour l'autocomplete<br>
`placesOptions (object)` : objet d'options pour l'autocomplete<br>
`placesMapOptions (object)` : objet d'options pour l'association champ autocomplete / map<br>
`checkMapSize (bool)` : vérifie si la map a bien une hauteur/largeur<br>
`mapDefaultCenter ({lat: x, lng: y})` : centre par défaut de la map<br>
`mapAutoCenter (bool)` : indique si la map doit centrer automatiquement sur l'ensemble des coordonnées<br>
`mapAutoZoom (bool)` : zoom automatique de la map lors du centrage automatique<br>
`mapDefaultZoom (int)` : zoom par défaut de la map<br>
`mapProvider (string)` : fournisseur de la map (seulement `google` pour le moment)<br>
`mapShowPlaces (bool)` : afficher ou non les marqueurs de lieux _(peut être surchargé par mapCustomStyles)_<br>
`mapType (string)` : indique le type de carte souhaité _(roadmap, satellite, hybrid, terrain)_<br>
`mapCustomStyles (array)` : tableau de styles personnalisés à appliquer à la map<br>
`markerIconCentered (bool)` : indique si l'icône du marqueur doit être centrée _(utile si ronde)_<br>
`clusterIconCentered (bool)` : indique si l'icône du cluster doit être centrée _(utile si ronde)_<br>

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
`mapMarkerIconUrl (string)` : URL vers l'icône du marker<br>
`mapMarkerHoveredIconUrl (string)` : URL vers l'icône survolée du marker<br>
`mapMarkerSelectedIconUrl (string)` : URL vers l'icône sélectionnée du marker<br>
`mapMarkerIconSize (int)` : Taille des icônes de marqueurs<br>
`mapHideMarkerOnClickOutside (bool)` : Indique si les marqueurs doivent se fermer au click sur la carte (en dehors du
marqueur)<br>

### Clusters de markers

`mapUseClusters (bool)` : indique si la map doit générer des clusters lorsque les points sont suffisamment
rapprochés<br>
`mapClusterParams (object[])` : Tableau d'objets contenant des paramètres de clusters<br>

```javascript
mapClusterParams: [
    // Avec icône PNG
    {
        icon: "/dist/img/cluster.png", // Icône du cluster (optionnel)
        hoverIcon: "/dist/img/cluster-hovered.png", // Icône du cluster au survol (optionnel)
        size: 40, // Taille de l'icône (optionnel)
        from: 0, // Nombre de points regroupés à partir duquel ces paramètres sont utilisés
    },
    // Sans icône PNG
    {
        size: 56, // Taille de l'icône (optionnel)
        from: 3, // Nombre de points regroupés à partir duquel ces paramètres sont utilisés
        defaultIconColor: "#FF0000", // Couleur de l'icône par défaut du cluster (optionnel)
        defaultIconHoverColor: "#FF00FF", // Couleur de l'icône par défaut du cluster au survol (optionnel)
    }
]
```

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
        iconSize: 32,
        iconCentered: false,
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

### Map :

`mapHasAutoCentered` : indique que la carte a été centrée automatiquement<br>
`mapLoaded` : indique que la carte est complètement chargée<br>
`mapReset` : indique que la carte a été réinitialisée<br>
`mapCleared` : indique que la carte a été vidée<br>
`mapTypeChanged` : indique que le type de carte a été changé<br>
`mapCustomMinusZoom` : indique que le zoom a été diminué via le bouton custom<br>
`mapCustomPlusZoom` : indique que le zoom a été augmenté via le bouton custom<br>
`mapCustomZoom` : indique que le zoom a été modifié via un bouton custom<br>

### Marqueurs :

`markerCreated` : Retourne l'instance d'un marqueur Google Maps lorsqu'il vient d'être créé.<br>
`markerDataCreated` : Retourne les données d'un marqueur lorsqu'il vient d'être intégralement créé (marqueur, infobulle
et élément de liste).<br>
`markerClicked` : Retourne les données d'un marqueur lorsque l'on clique dessus.<br>
`markerGeolocationClicked` : Indique que le marqueur de position GPS a été cliqué.<br>
`markerGeolocationRemoved` : Indique que le marqueur de position GPS a été supprimé.<br>
`allMarkerUnselected` : Indique que tous les marqueurs ont été désélectionnés.<br>

### Infobulles :

`infoWindowCreated` : Retourne les données d'un marqueur lorsqu'une infobulle a été créée.<br>

### Éléments de liste :

`listEltCreated` : Retourne les données d'un marqueur lorsqu'un élément de liste vient d'être créé.<br>
`listEltClicked` : Retourne les données d'un marqueur lorsque l'on clique sur un élément de liste.<br>

### RGPD :

`consentButtonClicked` : Est émit lorsque le bouton de consentement de la map est cliqué.<br>
`mapConsentNotGiven` : Est émit lorsque le consentement de la map n'a pas été donné _(même au chargement)_.<br>
`mapConsentGiven` : Est émit lorsque le consentement de la map a été donné _(même au chargement)_.<br>

### Clusters

`clustersEnabled` : Est émit lorsque les clusters ont été activés (à l'init et à l'activation manuelle)<br>
`clustersDisabled` : Est émit lorsque les clusters ont été désactivés

### Places

`selectedPlaceHasBeenCentered` : Est émit lorsque le lieu choisit via le champ autocomplete est centré sur la map<br>
`selectedPlaceHasBeenFound` : Est émit lorsque les données du lieu choisit via le champ autocomplete sont récupérées<br>
`fieldHasBeenFocused` : Est émit lorsque le champ autocomplete est focus<br>
`fieldHasBeenBlurred` : Est émit lorsque le champ autocomplete n'est plus focus<br>

### Géolocalisation

`geolocationSuccess` : Est émit lorsque le navigateur a bien renvoyé des coordonnées GPS<br>
`geolocationError` : Est emit lorsque le navigateur n'a pas pu renvoyer des coordonnées GPS<br>
`geolocationCentered` : Est émit lorsque la carte a été centrée sur les coordonnées de l'utilisateur

## Fonctions

`_setConsent (bool)` : Permet d'indiquer dynamiquement l'état de consentement de l'utilisateur<br>
`_addMarkers (array|object)` : Permet d'ajouter dynamiquement des marqueurs à la map<br>
`_removeMarkers (array|object)` : Permet de supprimer dynamiquement des marqueurs à la map<br>
`_getAllCurrentMarkersRawData (void)` : Permet de récupérer l'ensemble des données brutes de marker sur la map<br>
`_disableClusters (void)` : Permet de désactiver l'affichage en clusters s'il est activé<br>
`_enableClusters (void)` : Permet d'activer l'affichage en clusters s'il n'est pas activé<br>
`_geolocateOnMap (void)` : Permet de centrer la carte sur la position GPS de l'utilisateur<br>
`_removeGeolocationMarker (void)` : Permet de supprimer le marqueur de position GPS (s'il existe sur la carte)<br>
`_clearMap (void)` : Permet de supprimer tous les marqueurs de la carte<br>
`_resetMap (void)` : Permet de réinitialiser la map avec ses marqueurs / clusters<br>
`_setZoom (number)` : Permet de régler le niveau de zoom de la map<br>
`_setCenter ({lat,lng})` : Permet de régler le centre de la map<br>
`_setMapType (string)` : Permet de régler dynamiquement le type de carte (roadmap, satellite, hybrid, terrain)<br>
`_zoomPlus (void)` : Enclenche un zoom positif sur la carte<br>
`_zoomMinus (void)` : Enclenche un zoom négatif sur la carte<br>
`_unselectAllMarkers (void)` : Dé-sélectionne l'ensemble des marqueurs ouverts (et ferme les infoWindows)<br>
`_setStyle (object)` : Permet de régler dynamiquement le style de la map<br>
