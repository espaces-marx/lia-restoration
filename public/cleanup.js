export function cleanupHTML(rawHTML) {
  let t = rawHTML;

  t = removeSpaces(t);
  t = leninHeader(t);
  t = t.replaceAll(/<!--[^>]*-->/gm, '');
  t = removeMouseover(t);
  t = linkCleanup(t);
  t = selfcloseCleanup(t);
  t = removeSpaces(t);
  t = t.replaceAll(/<a id='[^']*'>/gm, '');
  t = headCleanup(t);
  t = paragraphCleanup(t);
  t = endnoteCleanup(t);
  t = classRemoval(t);
  t = characterCleanup(t);
  t = infoCleanup(t);
  t = endDocCleanup(t);
  t = htmlCleanup(t);
  t = infoTableCleanup(t);
  t = t.replaceAll(/<span>(.+)(\s+)(.+)<\/span>/gm, '$1 $3');

  return t;
}

function removeSpaces(t) {
  t = t.replaceAll(`      `, ``);
  t = t.replaceAll(`    `, ``);
  t = t.replaceAll(`  `, ``);
  t = t.replaceAll(`  `, ``);
  t = t.replaceAll(` &#160;`, ``);
  t = t.replaceAll(`\t`, ``);
  t = t.replaceAll(`&nbsp;`, ``);
  t = t.replaceAll(`\n\n \n`, ``);
  t = t.replaceAll(`\n\n  \n`, ``);
  t = t.replaceAll(`\n\n   \n`, ``);
  return t;
}

function leninHeader(t) {
  t = t.replaceAll(`<h2>\n<a title`, `<h2><a title`);
  t = t.replaceAll(`</a>\n\n<a title`, `</a> <a title`);
  t = t.replaceAll(/<h2><a [^>]*\">V\. I\.(.+)Lenin<\/a><\/h2>/gm, `<h2>Vladimir Ilyich Lenin</h2>`);
  return t;
}

function removeMouseover(t) {
  t = t.replaceAll(/<a onmouseover="[^"]*" onmouseout="[^"]*">(\w+)<\/a>/gm, `$1`);
  t = t.replaceAll(/<a onmouseover="[^"]*" onmouseout="[^"]*">(\w+\W+)<\/a>/gm, `$1`);
  t = t.replaceAll(/<a onmouseover="[^"]*" onmouseout="[^"]*">(\s+)<\/a>/gm, ` `);
  t = t.replaceAll(/<a onmouseover="[^"]*" onmouseout="[^"]*"><\/a>/gm, ``);
  return t;
}

function selfcloseCleanup(t) {
  t = t.replaceAll(`  />`, `>`);
  t = t.replaceAll(` />`, `>`);
  t = t.replaceAll(`/>`, `>`);
  return t;
}

function linkCleanup(t) {
  t = t.replaceAll(` <a name="notes"></a>`, ``);
  t = t.replaceAll(` <a name="footnotes"></a>`, ``);
  t = t.replaceAll(` <a name="endnotes"></a>`, ``);
  t = t.replaceAll(`a class="ednote"`, `a`);
  t = t.replaceAll(`a class="anote"`, `a`);
  t = t.replaceAll(`a class="endnote"`, `a`);
  t = t.replaceAll(`<a name=`, `<a id=`);
  t = t.replaceAll(`<a\n name=`, `<a id=`);
  t = t.replaceAll(`<a \n name=`, `<a id=`);
  t = t.replaceAll(`<a\n id=`, `<a id=`);
  t = t.replaceAll(`"\n href=`, `" href=`);
  t = t.replaceAll(`<sup><a`, `<sup class="endnote"><a`);
  t = t.replaceAll(`class="ednote"`, `class="endnote"`);
  t = t.replaceAll(/" name="[^"]*"/gm, `"`);
  return t;
}

function headCleanup(t) {
  t = t.replaceAll(/<!DOCTYPE [^>]*>/gm, `<!DOCTYPE html>`);
  t = t.replaceAll(`<html xmlns="http://www.w3.org/1999/xhtml">`, `<html lang="en">`);
  t = t.replaceAll(`<html lang="en"><head>`, `<html lang="en">\n<head>`);
  t = t.replaceAll(`<!DOCTYPE html>\n\n\n<html lang="en">`, `<!DOCTYPE html>\n\n<html lang="en">`);
  t = t.replaceAll(`<meta name="generator" content="http://www.marxists.org/archive/lenin/howto/tx2html.el">\n`, ``);
  t = t.replaceAll(/<meta name="generated" content="[^"]*">/gm, ``);
  t = t.replaceAll(`">\n\n\n\n\n<title>`, `">\n\n<title>`);
  t = t.replaceAll(`<meta`, `  <meta`);
  t = t.replaceAll(`<link`, `  <link`);
  t = t.replaceAll(`<title>`, `  <title>`);
  return t;
}

function paragraphCleanup(t) {
  t = t.replaceAll(`<p>\n\n\n`, `<p>`);
  t = t.replaceAll(`<p>\n\n`, `<p>`);
  t = t.replaceAll(`<p>\n`, `<p>`);
  t = t.replaceAll(`\n\n\n</p>`, `</p>`);
  t = t.replaceAll(`\n\n</p>`, `</p>`);
  t = t.replaceAll(`\n</p>`, `</p>`);
  t = t.replaceAll(`<p class="fst">\n\n`, `<p class="fst">`);
  t = t.replaceAll(`<p class="fst">\n`, `<p class="fst">`);
  t = t.replaceAll(`<p class="endnote">\n`, `<p class="endnote">`);
  t = t.replaceAll(`</p><p>`, `</p>\n\n<p>`);
  t = t.replaceAll(`</p>\n\n \n\n<p>`, `</p>\n\n<p>`);
  t = t.replaceAll(`</p>\n\n\n\n<hr>`, `</p>\n\n<hr>`);
  t = t.replaceAll(`<p class="quote">\n`, `<p class="quote">`);
  t = t.replaceAll(`<p class="sig">\n`, `<p class="sig">`);
  t = t.replaceAll(`<p class="placedate">\n`, `<p class="placedate">`);
  return t;
}

function endnoteCleanup(t) {
  t = t.replaceAll(`\n&#8212;<em>Lenin</em>`, `—<em>Lenin</em>`);
  t = t.replaceAll(`<h3>Notes</h3>\n\n\n\n\n\n<p class="endnote">`, `<h3>Notes</h3>\n\n<p class="endnote">`);
  t = t.replaceAll(`<h3>Notes</h3>\n\n\n\n\n\n\n\n\n\n<p class="endnote">`, `<h3>Notes</h3>\n\n<p class="endnote">`);
  t = t.replaceAll(`</p>\n\n\n\n\n\n<p class="endnote">`, `</p>\n\n<p class="endnote">`);
  t = t.replaceAll(`</p>\n\n\n\n<p class="endnote">`, `</p>\n\n<p class="endnote">`);
  t = t.replaceAll(`</p>\n\n\n\n\n\n\n\n<p class="endnote">`, `</p>\n\n<p class="endnote">`);
  return t;
}

function classRemoval(t) {
  t = t.replaceAll(` class="supratitle"`, ``);
  t = t.replaceAll(` class="subtitle"`, ``);
  t = t.replaceAll(` class="chapnumb"`, ``);
  t = t.replaceAll(` class="chaptitl"`, ``);
  t = t.replaceAll(` class="inline"`, ``);
  t = t.replaceAll(` class="title"`, ``);
  t = t.replaceAll(` title="Endnotes HR"`, ``);
  return t;
}

function characterCleanup(t) {
  t = t.replaceAll(`\\"a`, `ä`);
  t = t.replaceAll(`\\"A`, `Ä`);
  t = t.replaceAll(`\\"i`, `ï`);
  t = t.replaceAll(`\\"I`, `Ï`);
  t = t.replaceAll(`\\"o`, `ö`);
  t = t.replaceAll(`\\"O`, `Ö`);
  t = t.replaceAll(`\\"u`, `ü`);
  t = t.replaceAll(`\\"U`, `Ü`);
  t = t.replaceAll(`\\thinspace`, ``);
  return t;
}

function infoCleanup(t) {
  t = t.replaceAll(/<a [^>]*\.txt">(\w+)<\/a>/gm, `$1`);
  t = t.replaceAll(/<a [^>]*\.txt">(\W+)<\/a>/gm, `$1`);
  t = t.replaceAll(`pages<span class="pages">`, `pages <span class="pages">`);
  t = t.replaceAll(/<span class="pages">(.+)<\/span>/gm, `$1`);
  t = t.replaceAll(`pages<span class="page">`, `pages <span class="page">`);
  t = t.replaceAll(/<span class="page">(.+)<\/span>/gm, `$1`);
  t = t.replaceAll(`<p class="information">\n\n<span`, `<p class="information">\n<span`);
  t = t.replaceAll(`<br><span class="info">`, `<br>\n\n<span class="info">`);
  t = t.replaceAll(`<span class="info" style="text-indent: 0%">\n\nPublished:`, `<span class="info" style="text-indent: 0%">Published:`);
  t = t.replaceAll(`<span class="info" style="text-indent: 0%">\n\nWritten:`, `<span class="info" style="text-indent: 0%">Written:`);
  t = t.replaceAll(`<span class="info">\n\n`, `<span class="info">`);
  t = t.replaceAll(`</span>\n\n`, `</span> `);
  t = t.replaceAll(`\n\n<br>`, `<br>`);
  return t;
}

function endDocCleanup(t) {
  t = t.replaceAll(`</p>\n\n\n\n\n</body>`, `</p>\n\n</body>`);
  t = t.replaceAll(`</html>\n`, `</html>`);
  return t;
}

function htmlCleanup(t) {
  t = t.replaceAll(`<center>`, `<div style="text-align:center">`);
  t = t.replaceAll(`</center>`, `</div>`);
  t = t.replaceAll(`align="center"`, `style="text-align: center;"`);
  return t;
}

function infoTableCleanup(t) {
  t = t.replaceAll(`class="info" style="text-align: center;" width="80%"`, `class="info" style="width: 80%;"`);
  t = t.replaceAll(`<td style="text-align: center;" width="33%">`, `<td style="text-align: center;  width: 33%;">`);
  t = t.replaceAll(`<tr><td style="text-align: center;  width: 33%;">`, `  <tr>\n<td style="text-align: center;  width: 33%;">`);
  t = t.replaceAll(`<td style="text-align: center;  width: 33%;">`, `    <td style="text-align: center;  width: 33%;">`);
  return t;
}
