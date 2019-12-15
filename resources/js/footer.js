
function copyrightFooter() {
        
    let copyrightText = document.getElementById('copyright-date');
    copyrightText.innerHTML = "&copy; " + new Date().getFullYear() + " localhost";

    //Get element you are inserting before of
    let firstChildNode = document.getElementById('footer').children[0];

    document.getElementById('footer').insertBefore(copyrightText, firstChildNode);
}