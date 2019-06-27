"use strict";

// Load plugins
const browsersync = require("browser-sync").create();
const del = require("del");
const gulp = require("gulp");
const merge = require("merge-stream");

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del(["./vendor/"]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap
  var bootstrap = gulp.src('./node_modules/bootstrap/dist/**/*')
    .pipe(gulp.dest('./vendor/bootstrap'));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrap, jquery);
}

// Watch files
function watchFiles() {
  gulp.watch("./**/*.css", browserSyncReload);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const build = gulp.series(vendor);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));

// Export tasks
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports.default = build;

// random message gen js
//
// var facts = ['The [USA women’s soccer] team was awarded $2 million for their first place finish. While this amount is significant, it pales in comparison to what the USA men’s team received last year after losing in round sixteen: $9 million. And it really pales in comparison to what the Germany men’s team received for winning: $35 million.', 'NBA pays its players between 49-51 percent of the league’s revenue, WNBA players take home a maximum of 22.8 percent', 'World Surf League announced equal prize money for all WSL-controlled events in 2019 and beyond' ];
// // var facts = ['hi', 'hey', 'hello' ];
// var button = $(".button");
// var factshere = $(".factshere");
//
// button.on("click", randomizer);
//
// function randomizer (){
//   var random = Math.floor(Math.random()*(facts.length));
//   var newfacts = facts[random];
//   factshere.text(newfacts);
// }
//
// var race = ['It takes  the typical black woman 20 months to earn what a white male worker earns in a single year.', 'Worse still, women are paid about 80 cents to every dollar a man makes — a number that falls to 63 cents for black women, and just 54 cents for Latina women, when compared to white men.', 'Hispanic women’s median weekly earnings in 2018 were $617 per week of full-time work, only 61.6 percent of White men’s median weekly earnings', 'The American Association of University Women recently published a study showing that even when both genders’ levels of education and experience are the same, the gap remains.', 'Women are paid 78 percent of what men are paid on average in nearly every occupation. ', ' Hispanic women make 54 percent of white men’s earnings and black women make 64 percent of white men’s earnings.', 'The average gender pay gap in U.S. tech is 3 percent — but the research showed that for LGBTQ women that gap rises to 8 percent, while Hispanic women are paid 9 percent less than their white male counterparts.', 'Black women were being paid just $0.89 for every dollar earned by white men in their companies, the survey found.'];
// // var race = ['one', 'two', 'three' ];
// var buttonTwo = $(".buttonTwo");
// var factshere = $(".factshere");
//
// buttonTwo.on("click", randomizer2);
//
// function randomizer2 (){
//   var random = Math.floor(Math.random()*(race.length));
//   var newrace = race[random];
//   factshere.text(newrace);
// }
//
// var healthcare = ['\“I was offered $50,000 per year lower than a male physician who was hired six months before me,\” she [An OB/GYN in California] says. Her colleague told her his starting salary and that they were equivalent in terms of experience, but she had an additional board certification. When she asked her employer, a large healthcare system, to match his salary, they would not.', 'Even though nine out of 10 nurses are women, men in the profession earn higher salaries... The typical salary gap has consistently been about $5,000 even after adjusting for factors such as experience, education, work hours, clinical specialty, and marital and parental status', 'Women doctors earned an average of 27.7% less than their male counterparts in 2017, according to a new survey of 65,000 physicians by Doximity: an average of $105,000 less a year.'];
// // var healthcare = ['tara', 'yazzy' ];
// var buttonThree = $(".buttonThree");
// var factshere = $(".factshere");
//
// buttonThree.on("click", randomizer3);
//
// function randomizer3 (){
//   var random = Math.floor(Math.random()*(healthcare.length));
//   var newhealthcare = healthcare[random];
//   factshere.text(newhealthcare);
// }
//
// var extra = ['In some industries and occupations, like construction, there has been no progress in forty years.', 'On a happier note, when comparing two people in the same profession, with the same seniority, working the same number of hours, and so forth, women earn $0.98 for every dollar that a man earns.', 'In 1947, Secretary of Labor Lewis Schwellenbach introduced the Women’s Equal Pay Act, which he argued for on the grounds of “economic justice.” Schwellenbach’s proposal faced significant blowback and was quickly defeated.'];
// // var healthcare = ['tara', 'yazzy' ];
// var buttonFour = $(".buttonFour");
// var factshere = $(".factshere");
//
// buttonFour.on("click", randomizer4);
//
// function randomizer4 (){
//   var random = Math.floor(Math.random()*(extra.length));
//   var newextra = extra[random];
//   factshere.text(newextra);
// }
