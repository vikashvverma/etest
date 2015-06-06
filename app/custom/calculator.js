var broj = "0"
            var tocka = 0
            var eksp = 0
            var eksponent = 3
            var rjesenje = 0
            var decimala = 0
            var enter = "";


            function memory(operator) {
                document.getElementById("zadatak").focus();
                if (operator == 1) {		// MS
                    document.getElementById("memorija").value = document.getElementById("rezultat").value
                }
                else if (operator == 2)	{	// MR
                    var memorija = document.getElementById("memorija").value;
                    if (memorija==0 || slovo(memorija.charAt(0)))
                    {
                        // alert("yes");
                        memorija = ""
                    };
                    document.getElementById("zadatak").value += memorija
                }
                else if (operator == 3) {

                    if (document.getElementById("zadatak").value == "") {
                        document.getElementById("rezultat").value = "";
                    }
                    else {
                        document.getElementById("zadatak").value = "";
                    }
                }
            }


            function display(noviznak) {
                if (noviznak=="")
                {document.getElementById("zadatak").focus()}
                else
                {document.getElementById("rezultat").select()}

            }


            function dodajBroj(noviznak) {
                //   alert("in value "+document.getElementById("racunalo").document.getElementById("zadatak").focus());
                document.getElementById("zadatak").focus();
                document.getElementById("zadatak").value += noviznak
            }


            function izracunaj(zarez) {
                var pitanje = "";
                var mem = 0;               
                if (zarez >= 1) {
                    if (document.getElementById("zadatak").value == "") {                      
                        broj = document.getElementById("rezultat").value;                       
                    }
                    else {
                      
                        broj = document.getElementById("zadatak").value;

                        if (ubacirezultat(broj.charAt(0))) {                          
                            broj = document.getElementById("rezultat").value + broj;
                        }
                    }
                }
                for (var i=0; i<broj.length; i++) {
                    if (broj.charAt(i) == ",") {pitanje += "."}
                    else if (broj.charAt(i) == " ") {}
                    else {pitanje += broj.charAt(i)}
                }

                if (operator(broj.charAt(broj.length-1))) {return false};
                pitanje = eval("1*" + pitanje);

                if (zarez > 1) {

                    pitanje = matematika(zarez, pitanje);
                }

                document.getElementById("oldrezultat").value = pitanje;

                zaokruzi(pitanje);
                document.getElementById("zadatak").value = "";
                document.getElementById("zadatak").focus();
            }


            function matematika(zarez, rjesenje) {
                with (Math)
                {

                    if (zarez == 2) {
                        rjesenje = pow(rjesenje, 2);
                    }
                    else if (zarez == 3) {
                        rjesenje = sqrt(rjesenje);
                    }
                    else if (zarez == 4) {
                        rjesenje = -rjesenje;
                    }
                    else if (zarez == 5) {
                        rjesenje = log(rjesenje);
                    }
                    else if (zarez == 6) {
                        rjesenje = pow(E, rjesenje);
                    }
                    else if (zarez == 7) {
                        rjesenje = 1/rjesenje;
                    }
                    else if (zarez == 8) {
                        rjesenje = log(rjesenje)/LN10;
                    }
                    else if (zarez == 9) {
                        rjesenje = pow(10, rjesenje);
                    }
                    else if (zarez >= 10 && zarez <= 12) {
                        if (zarez == 10) {
                            rjesenje = atan(rjesenje)
                        }
                        else if (zarez == 11) {
                            rjesenje = acos(rjesenje)
                        }
                        else if (zarez == 12) {
                            rjesenje = asin(rjesenje)
                        }

                        if (document.getElementById("stupnjevi1").checked) {rjesenje = (rjesenje * 180) / PI}
                    }
                    else if (zarez >= 14 && zarez <= 16) {

                        if (document.getElementById("stupnjevi1").checked)

                        {
                            radijani = (rjesenje / 180) * PI}
                        else
                        {
                            radijani = rjesenje;
                        }

                        if (zarez == 14) {
                            rjesenje = tan(radijani);
                        }
                        else if (zarez == 15) {
                            rjesenje = cos(radijani);
                        }
                        else if (zarez == 16) {                          
                            rjesenje = sin(radijani);
                          
                        }
                    }
                    else if (zarez == 17) {
                        rjesenje = rjesenje/100
                    }
                    else if (zarez == 18) {
                        rjesenje = rjesenje/1000000
                    }
                    else if (zarez == 20) {
                        rjesenje = factorial(rjesenje)
                    }
                    else if (zarez == 21) {
                        eksponent = prompt("Please enter exponent", 3);
                        rjesenje = pow(rjesenje, eksponent)
                    }
                    else if (zarez == 22) {
                        eksponent = prompt("Please enter root", 3);
                        rjesenje = pow(rjesenje, (1/eksponent))
                    }
                    return rjesenje

                }
            }


            function zaokruzi(ebroj) {


                decimala=parseFloat(document.getElementById('izaZareza').options[document.getElementById('izaZareza').selectedIndex].value);

                var strbroj = ebroj + " ";
                if (strbroj.charAt(0) == ".") {strbroj = "0" + strbroj};
                var intbroj = strbroj.length - 1;
                deczarez(strbroj);

                if (intbroj > 16 && eksp == -1) {
                    if (decimala == -1) {decimala = 14};
                    strbroj = izazareza(strbroj.substring(0,intbroj)) + " ";
                    intbroj = strbroj.length - 1;
                    deczarez(strbroj)
                }

                if (decimala >= 0 && decimala != 14) {
                    if (tocka > 0) {
                        var odgovor = izazareza(strbroj.substring(0,intbroj))
                    }
                    else {
                        ebroj = strbroj.substring(0,intbroj);
                        if (decimala > 0) {
                            ebroj += ".";
                            for (var n = 0; n < decimala; n++) {
                                ebroj += "0"
                            }
                        }
                        var odgovor = ebroj
                    }
                }
                else {
                    decimala = 14;
                    var odgovor = izazareza(strbroj)
                }

                if (odgovor.charAt(0) == ".") {odgovor = "0" + odgovor};
                document.getElementById("rezultat").value = odgovor;
            }


            function deczarez(novibroj) {
                tocka = 0;
                eksp = 0;

                tocka = novibroj.indexOf(".");
                eksp = novibroj.indexOf("e")
            }


            function izazareza(novibroj) {
                with (Math) {

                    if (eksp == -1) {
                        var duzina = tocka;
                        if (duzina == -1) {duzina = novibroj.length};
                        var desni = "";

                        if (duzina > 16) {
                            var privremeni = round(novibroj*pow(10, 18)) + " ";
                            var novie = privremeni.indexOf("e");
                            var lijevi = (privremeni.substring(0,novie));

                            lijevi = round(lijevi*pow(10, 15))/pow(10, 15) + " ";
                            desni = (privremeni.substring(novie+2,privremeni.length-1));
                            desni = "e+" + (desni-18)
                        }
                        else {
                            var lijevi = round(novibroj*pow(10, decimala))/pow(10, decimala) + " "
                        }
                    }
                    else {
                        var lijevi = novibroj.substring(0,eksp);
                        var desni = novibroj.substring(eksp,novibroj.length);

                        lijevi = round(lijevi*pow(10, decimala))/pow(10, decimala) + " "
                    }

                    lijevi = lijevi.substring(0,lijevi.length - 1);

                    if (lijevi.charAt(0) == ".") {lijevi = "0" + lijevi};

                    if (decimala < 14) {
                        if (lijevi.indexOf(".") == -1 && decimala != 0) {lijevi += "."};
                        var nula = (tocka + decimala) - (lijevi.length - 1);
                        if (nula > 0 && decimala > 0) {
                            for (var n = 0; n < nula; n++) {
                                lijevi += "0"
                            }
                        }
                    }
                    return (lijevi + " " + desni)
                }
            }


            function factorial(n) {
                if ((n == 0) || (n == 1)) {
                    return 1
                }
                else {
                    var odgovor = (n * factorial(n-1));
                    return odgovor
                }
            }


            function slovo(znak) {
                var slovo="(ABCDEFGHIKLMNOPRSTUVWXYZ";
                for (var i=0; i<slovo.length; i++)
                    if (znak == slovo.charAt(i)) {return true} {return false}
            }


            function operator(znak) {
                var matoperator="*/+-";
                for (var i=0; i<matoperator.length; i++)
                    if (znak == matoperator.charAt(i)) {return true}
                return false
            }

            function ubacirezultat(znak) {
               
                var ubacirezultat="*/+";
              
                for (var i=0; i<ubacirezultat.length; i++)
               
                    if (znak == ubacirezultat.charAt(i))
                {
                  
                    return true;
                }            

                return false;
            }