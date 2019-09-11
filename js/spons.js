function toggleSponsTab(tabName) {
    document.getElementsByClassName('past-spons')[0].style.display = 'none';
    document.getElementsByClassName('spons')[0].style.display = 'none';
    document.getElementsByClassName(tabName)[0].style.display = 'flex';


    document.querySelectorAll('.spons-tab span')[0].classList.remove('active');
    document.querySelectorAll('.past-spons-tab span')[0].classList.remove('active');
    document.querySelectorAll('.' + tabName + '-tab span')[0].className = 'active';
}