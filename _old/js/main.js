
function findWork(route) {
  var work =  works.find(x => x.id === route.params.work);
  return {work: work, lang: route.params.lang};
}

const aboutTemplate = {
  props: ['lang', 'pages'],
  template: '\
    <div>\
      <div class="page-header row">\
        <h2 :class="{\'text-right\': lang === \'he\', \'ml-auto\': lang === \'he\'}">{{pages[\'about\'][lang].title}}</h2>\
      </div>\
      <div class="page-container">\
        <p :class="{\'text-right\': lang === \'he\', \'ml-auto\': lang === \'he\', \'rtl\': lang === \'he\'}">{{pages[\'about\'][lang].content}}\
        <br><br>\
        <img src="img/niv-shapira-studio/niv-shapira-250x250.jpg" class="rounded img-fluid">\
      </p>\
      </div>\
    </div>'
}

const workTemplate = {
  props: ['lang','work','pages'],
  template: '\
  <div>\
    <div class="page-header row">\
      <h2 :class="{\'text-right\': lang === \'he\', \'ml-auto\': lang === \'he\', \'rtl\': lang === \'he\'}">{{pages[\'works\'][lang].title}}</h2>\
    </div>\
  <div class="page-container" :class="{\'text-right\': lang === \'he\', \'rtl\': lang === \'he\'}">\
    <h3>{{ work.title[lang] }}</h3>\
    <p>{{ work.year }}</p>\
    <p>{{ work.description[lang] }}<a v-if="work.link" :href=work.link>{{work.link}}</a></p>\
    <template v-for="media in work.media">\
    <div v-if="media.type === ' + "'video'" + '" :class="' + "'embed-responsive embed-responsive-'+media.aspectRatio" + '">\
      <iframe v-if="media.embed" class="embed-responsive-item" :src=media.src frameborder="0"\
        allowfullscreen></iframe>\
      <video v-else controls class="embed-responsive-item">\
        <source :src=media.src>\
      </video>\
    </div>\
    <img v-if="media.type === ' + "'image'" + '" :src=media.src class="img-fluid">\
    </template>\
  </div>\
  </div>'
}

const allWorksTemplate = {
  props: ['lang', 'pages', 'works'],
  template: '\
    <div>\
      <div class="page-header row">\
        <h2 :class="{\'text-right\': lang === \'he\', \'ml-auto\': lang === \'he\', \'rtl\': lang === \'he\'}">{{pages[\'works\'][lang].title}}</h2>\
      </div>\
      <div class="row works-table">\
        <div class="works-work col-lg-4 col-6" v-for="work in works">\
          <router-link :to="\'/\'+lang+\'/works/\'+work.id"><img :src="work.banner" class="rounded-lg banner">\
          </router-link>\
        </div>\
      </div>\
    </div>'
}

const navTemplate = {
  props: ['lang', 'pages'],
  template: '\
    <nav class="navbar">\
      <span class="navbar-brand"> \
        <img :src="' + "'img/niv-shapira-studio/niv-shapira-studio-logo-'+lang+'.svg'" + '" width="144" alt=""> \
      </span>\
      <ul class="navbar-nav mr-auto">\
        <li class="nav-item">\
          <a v-on:click.stop.prevent="changeLang(\'en\')" class="nav-link language" role="button" :class="{active: lang === ' + "'en'"+ '}"><img src="img/icons/united-states.svg"></a>\
          <a v-on:click.stop.prevent="changeLang(\'he\')" class="nav-link language" role="button" :class="{active: lang === ' + "'he'"+ '}"><img src="img/icons/israel.svg"></a>\
        </li>\
        <li class="nav-item">\
          <a v-on:click.stop.prevent="goToPage(lang, pages.works.href)" role="button" class="nav-link">{{pages.works[lang].title}}</a>\
        </li>\
        <li class="nav-item">\
          <a v-on:click.stop.prevent="goToPage(lang, pages.about.href)" role="button" class="nav-link">{{pages.about[lang].title}}</a>\
        </li>\
        <li class="nav-item">\
          <a href="mailto:shapiraniv@gmail.com" class="nav-link">{{pages.contact[lang].title}}</a>\
        </li>\
      </ul>\
    </nav>',
    methods: {
      changeLang(query) {
        var path = this.$route.path;
        var newRoute = path.substring(0,1) + query + path.substring(3);
        this.$router.push({path: newRoute});
      },
      goToPage(l, hr) {
        var newRoute = "/" + l + "/" + hr;
        this.$router.push({path: newRoute});
      }
    }
}


const router = new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/en/works'
    },
    {
      path: '/:lang/works',
      components: {
        nav: navTemplate,
        main: allWorksTemplate
      },
      props: {
        nav: true,
        main: true
      }
    },
    {
      path: '/:lang/works/:work',
      components: {
        nav: navTemplate,
        main: workTemplate
      },
      props: {
        nav: true,
        main: findWork
      }
    },
    {
      path: '/:lang/about',
      components: {
        nav: navTemplate,
        main: aboutTemplate
      },
      props: {
        nav: true,
        main: true
      }
    },
  ]
})

const app = new Vue({
  //el: '#app',
  router: router,
  data: {
    works: works,
    pages: {
          works: {
            href: "works",
            en: {title: "Works"},
            he: {title: "עבודות"}
          },
          about: {
            href: "about",
            en: {
              title: "About",
              content: "Niv has been experimenting with design since a very young age - from building maps for Counter-Strike\
              to designing buildings in Sketch-Up, web design, logo design and more. At the age of 14 he watched the movie Shrek\
              and fell in love with animation, and especially 3D animation. Since then Niv has been playing with different kinds\
              of styles, moving on the borderline between art and realism."
            },
            he: {
              title: "על אודות",
              content: "ניב עורך ניסויים בעיצוב מגיל צעיר מאוד - החל מבניית מפות עבור המשחק Counter-Strike, כלה בעיצוב בניינים ב-Sketch-Up, \
              עיצוב אתרים, עיצוב לוגואים ועוד. בגיל 14 ניב צפה בסרט שרק ומיד התאהב בעולם האנימציה, ובמיוחד באנימציית תלת-מימד. מאז ניב משחק\
              בסגנונות שונים, ומהלך על הקו שבין אומנות למציאות."
            },
          },
          contact: {
            href: "contact",
            en: {title: "Contact"},
            he: {title: "צרו קשר"}
          }
        }
      }

});

app.$mount('#app');
