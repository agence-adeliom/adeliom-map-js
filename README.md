# Adeliom MAP Js

Dépendance de gestion de Google Maps / Store Locator Adeliom

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
`mapAnimation (string)` : type d'animation de transition entre positions dans la map (smooth / default)<br>
`mapAllowMultipleMarkersSelected (bool)` : si plusieurs marqueurs peuvent être sélectionnés en simultané<br>
`mapMarkerIcon (string)` : URL vers l'icône du marker<br>
`mapMarkerSelectedIcon (string)` : URL vers l'icône sélectionnée du marker<br>

### Infobulles
`mapInfoWindowTemplate (string)` : template HTML de l'infobulle d'un marqueur<br>
`mapDisplayInfoWindows (bool)` : la map doit-elle afficher les infobulles<br>

### Liste de points

`mapListEltTemplate (string)` : template HTML d'un élément de la liste des points<br>

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
        }
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