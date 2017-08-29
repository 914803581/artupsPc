var chalk = require('chalk')
var semver = require('semver')
var packageConfig = require('../package.json')
var shell = require('shelljs')
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

var versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  },
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  var warnings = []
  for (var i = 0; i < versionRequirements.length; i++) {
    var mod = versionRequirements[i]
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()
    for (var i = 0; i < warnings.length; i++) {
      var warning = warnings[i]
      console.log('  ' + warning)
    }
    console.log()
    process.exit(1)
  }
}

console.log('                                                                                                    ');
console.log('        ..                                                                   ,. .                   ');
console.log('     ;WWWW.                                                          .ffjjf; KE.KL     ,GGGGGGGGGGG:');
console.log('    .KWWWWf               :;                                         :WKKWWj;Wt DW     ;WKEEEEEEEKW,');
console.log('    iWWDWWK.             tWD                                           . Kf.EWKEKWEE.  ;WG:::::::DW,');
console.log('    DWWiDWW;    .;;, ,i ,KWE;,. :;,: ;;  .;;;;;,.   ,,;;;;,,.         DE KfiWKLGWKLL   ,WKEEEEEEKKW,');
console.log('   iWWW:fWWE    iWWWDWW jWWWWWi LWWDGWW ,KWWWWWWWj  EWWWWWWWWt        Kf KjWWE  KD     ,WG.......LW,');
console.log('   LWWD ;WWW,   iWWWKDG.jWWKDE, fKWWKDD LWWKDDKWWK  EWWEDDKWWE       :WLtKGEEKttWEti   ;WWWWWWWWWWW,');
console.log('   KWK;  EWWf   iWWW.   jWWD    fWWK.   DWWL  iWWK  EWWj  iWWK       :KKWWWiE#KEWWKD             .. ');
console.log('  tWWK   tWWW   iWWW.   jWWD    fWWE    DWWL  iWWW  EWWj  iWWE        ::KWf EE .KD.    LGGGGGGGGGGGL');
console.log('  DWWEtttjKWWi  iWWW.   jWWD    fWWE    DWWL  iWWW  EWWj  tWWE         jWKL EKiiWEi;   KKLffffffffKK');
console.log(' :WWWWWWWWWWWG  iWWW    jWWE    fWWE    DWWL  iWWK  EWWj  tWWE        iW,Ef EWWWWWWK.  EE:::::::::EK');
console.log(' LWWWKKKKKKWWK: iWWW    jWWD    fWWE    DWWL  iWWK  EWWj  tWWE       ;WD Kf EE  KE     EWKKKKKKKKWWE');
console.log('.KWWD.    ;WWWL iWWW    tWWE.   fWWE    DWWL  tWWW  EWWj  tWWE       iE. Kf EE  KD     EE.........EK');
console.log('tWWWj     .EWWK iWWW.   ,WWWKKi fWWE    fWWWKKWKWK  EWWj  tWWE        ,GDWf EWKKWWKK;  EKEEEEEEEEKWK');
console.log('GKKK:      LKKK.iKKK.    fKKKK; fKKD     GKKKKKKD,  DKKj  tKKE        .KKD: EKiiii;i.  EKffffffjffKK');
console.log('                                                                                                    ');

