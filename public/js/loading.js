(function() {
    document.documentElement.style.visibility = 'hidden';
    document.onreadystatechange = function completeLoading() {
        if (document.readyState == 'complete') {
            setTimeout(function() {
                document.documentElement.style.visibility = 'visible';
            }, 0);
        }
    };
})();