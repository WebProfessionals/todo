function cNachF() {
    var eingabe = document.getElementById('eingabe');
    var ausgabe = document.getElementById('resultat');

// Wert aus input feld holen
    var celsius = parseInt(eingabe.value);
// FahrenhietWert rechnen
    ausgabe.innerHTML = celsiusNachFahrenheit(celsius);
}




/**
 * Rechnet die Temp von C in F um
 * @param Celcius (number) Temp in °C
 * @returns {number}
 */
function celsiusNachFahrenheit(Celcius) {
    var Fahrenheit = Celcius * (9 / 5) + 32;
    Celcius = Celcius * 44;
    return Fahrenheit;
}

