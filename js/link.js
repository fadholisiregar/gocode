// Menginisiasi sidebar nav
document.addEventListener("DOMContentLoaded", () => {
    // Activate sidebar nav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status != 200) return;

                // Memuat daftar tautan menu
                document.querySelectorAll(".topnav, .sidenav").forEach(elm => {
                    elm.innerHTML = xhttp.responseText;
                });

                // Mendaftarkan event listener untuk setuap tautan menu
                document.querySelectorAll('.sidenav a, .topnav a').forEach(elm => {
                    elm.addEventListener('click', event => {
                        // Menutup sidenav
                        const sidenav = document.querySelector('.sidenav');
                        M.Sidenav.getInstance(sidenav).close();

                        // Memuat konten halaman yang dipanggil
                        page = event.target.getAttribute('href').substr(1);
                        loadPage(page);

                    })
                })

            }
        };
        xhttp.open("GET", "link.html", true);
        xhttp.send();
    }

});


// Memuat halaman konten
let page = window.location.hash.substr(1);
if (page == "") page = "home";

loadPage(page);

function loadPage(page) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            const content = document.querySelector('#main-content');

            if (this.status == 200) {
                content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
                content.innerHTML = "<p>Page Not Found</p>";
            } else {
                content.innerHTML = '<p>Oops.. Page Cannot be Accessed</p>'
            }
            const slider = document.querySelectorAll('.slider');
            M.Slider.init(slider, {
                indicator: false,
                height: 500,
                transition: 600,
                interval: 3000
            })
        }
    }

    xhttp.open('GET', 'pages/' + page + ".html", true);
    xhttp.send();
}



