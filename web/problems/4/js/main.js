$(window).ready(init);

function init(){
    populate();
};

function populate(){
    var $table = $("table");
    $.ajax({
        url: "/SP6/api/members",
        success: function (data, textStatus, jqXHR) {
            $table.html('<thead><th>ID</th><th>Name</th><th>Age</th><th>Eye Color</th><th>Gender</th><th>Email</th></thead><tbody>');
            $.each(data, function (i, member){
                $table.append("<tr><td>" + member.id + "</td><td>" + member.name + "</td><td>" + member.age 
                        + "</td><td>" + member.eyeColor + "</td><td>" + member.gender + "</td><td>" + member.email + "</td></tr>");
            });
            $table.append('</tbody>');
        }
    });
}