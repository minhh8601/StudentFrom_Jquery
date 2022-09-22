var danhsachsinhvien=[];
var studentchoice={};
// $('input[type=submit]').click(function(e)
$('form').submit(function(e){
    e.preventDefault();
    if ($('input[type=submit]').val()=='Edit'){
        studentchoice.Name = $('#Name').val();
        studentchoice.Birthday = $('#Birthday').val();
        studentchoice.Mobilephone = $('#Mobilephone').val();
        studentchoice.Hometown = $('#Hometown').val();
        SaveData();
        RefreshDSSV();
        $('input[type=reset]').click();
        $('input[type=submit]').val('Save');
    }
    else{
        var sinhvien={};
        sinhvien.Name = $('#Name').val();
        sinhvien.Birthday = $('#Birthday').val();
        sinhvien.Mobilephone = $('#Mobilephone').val();
        sinhvien.Hometown = $('#Hometown').val();
        danhsachsinhvien.push(sinhvien);
        SaveData();
        RefreshDSSV();
        $('input[type=reset]').click();
    }
    
});

function RefreshDSSV(){
    $('.sv').remove();
    for(var i=0;i<danhsachsinhvien.length;i++){
        var html = "<div class=\"row sv\"><div class=\"col\">"+(i+1)+
        "</div><div class=\"col\">"+danhsachsinhvien[i].Name+
        "</div><div class=\"col\">"+danhsachsinhvien[i].Birthday+
        "</div><div class=\"col\">"+danhsachsinhvien[i].Mobilephone+
        "</div><div class=\"col\">"+danhsachsinhvien[i].Hometown+
        "</div><div class=\"col\"><button class=\"Editbtn\" stt=\""+i+"\">Edit</button><button class=\"deletebtn\" stt=\""+i+"\">Delete</button></div>";
        
        $('#DSSinhVien').append(html);
    }
    $('button.deletebtn').click(function(){
        // confirm("Bạn có chắc chắn muốn xóa sinh viên này?")
        // console.log($(this).attr('stt'));
        // var phantu = danhsachsinhvien.splice($(this).attr('stt'),1);
        // SaveData();
        // RefreshDSSV();
        var hoi = confirm("Bạn có chắc chắn xóa sinh viên này không?")
        if (hoi){       
            console.log($(this).attr('stt'));
            var phantu = danhsachsinhvien.splice($(this).attr('stt'),1);
            SaveData();
            RefreshDSSV();

        }
        
    });
    $('button.Editbtn').click(function(){
        studentchoice = danhsachsinhvien[$(this).attr('stt')];
        $('input[type=submit]').val('Edit');
        $('#Name').val(studentchoice.Name);
        $('#Birthday').val(studentchoice.Birthday);
        $('#Mobilephone').val(studentchoice.Mobilephone);
        $('#Hometown').val(studentchoice.Hometown);
        $('button.deletebtn').attr('disabled','disabled');
    });
}
function SaveData(){
    if(localStorage){
            localStorage.setItem('dsSinhVien',JSON.stringify(danhsachsinhvien));
    }
}
function LoadData(){
    if(localStorage){
        try{
            dsSinhVien = localStorage.getItem('dsSinhVien');
            if(dsSinhVien){
                danhsachsinhvien= JSON.parse(dsSinhVien);
            }
        }
        catch{
            console.log("Error or Data is empty!")
        }
    }
}
LoadData();
RefreshDSSV();
