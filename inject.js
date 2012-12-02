$('#buyinfo').before('<div class="gray_ad" id="hdulib"></div>');
$('#hdulib').append('<h2>杭电图书馆:</h2><div class="bs" id="libret"></div>');

var isbn = $('#info').text().split('ISBN: ')[1];
$.ajax({
    url: "http://210.32.33.91:8080/opac/openlink.php?strSearchType=isbn&historyCount=1&x=24&y=7&doctype=ALL&match_flag=any&displaypg=20&sort=CATA_DATE&orderby=desc&showmode=list&dept=ALL&strText=" + isbn,
    success: function(response) {
        if (response.indexOf("本馆没有您检索的馆藏书目") != -1) {
            $('#libret').html('<p>没有这本书 囧</p>');
        } else {
            $('#libret').html('<p>有这本书哎</p>');
            $('#libret').append('<h2>借阅情况:</h2>');
            $('#libret').append('<div class="gray_ad" id="booktable"></div>');
            var bookurl = "http://210.32.33.91:8080/opac/item.php?" + response.match(/marc_no=\d+/);
            $.ajax({
                url: bookurl,
                success: function (msg) {
                    var table = "<table>" + msg.split('<table width="670" border="0" align="center" cellpadding="2" cellspacing="1" bgcolor="#d2d2d2">')[1].split('</table')[0] + "</table>";
                    $('#booktable').html(table);
                    $('#booktable tr').each(function() {
                            $(this).find('td').eq(1).remove();
                            $(this).find('td').eq(1).remove();
                            $(this).find('td').eq(1).remove();
                    });
                    $('#booktable').append('<h2>具体连接</h2><p><a href="' + bookurl + '">猛击这里</a></p>');
                },
                error: function () {
                    $('#booktable').html('<p>囧，好像出什么岔子了</p>');
                }
            });
        }
    },
    error: function() {
        $('#libret').html('<p>囧，好像出什么岔子了</p>');
    }
});
