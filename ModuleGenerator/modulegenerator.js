const fs = require("fs");
const read = require("readline-sync");
const fse = require('fs-extra');



const php_data = `<?php

class ControllerInformationModuletemplate extends Controller {

	private $error = array();

	public function index() {

		//$this->language->load('information/moduletemplate');

		$this->document->setTitle("Clipuri");

		$data['column_left'] = $this->load->controller('common/column_left');

		$data['column_right'] = $this->load->controller('common/column_right');

		$data['content_top'] = $this->load->controller('common/content_top');

		$data['content_bottom'] = $this->load->controller('common/content_bottom');

		$data['footer'] = $this->load->controller('common/footer');

		$data['header'] = $this->load->controller('common/header');

		$this->response->setOutput($this->load->view('information/moduletemplate', $data));
	}
}
?>

`;


const tpl_data = 
 `<?php echo $header; ?>
    <h1 class="text-center"> Clips</h1> 
  <?php echo $footer; ?>`

const owlCarousel_data = `
<div class="owl-carousel owl-theme">
<div class="item"><h4>1</h4></div>
<div class="item"><h4>2</h4></div>
<div class="item"><h4>3</h4></div>
<div class="item"><h4>4</h4></div>
<div class="item"><h4>5</h4></div>
<div class="item"><h4>6</h4></div>
<div class="item"><h4>7</h4></div>
<div class="item"><h4>8</h4></div>
<div class="item"><h4>9</h4></div>
<div class="item"><h4>10</h4></div>
<div class="item"><h4>11</h4></div>
<div class="item"><h4>12</h4></div>
</div>
<script>
$('.owl-carousel').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:3
        },
        1000:{
            items:5
        }
    }
})
</script>`
var askName = () => {
  var name = read.question("Please enter the name of your module...:", {
    hideEchoBack: true});
  return name;
};

var askCarousel  = () =>  {
    var response = read.question("Add carousel to module ? (0/1)", {
      hideEchoBack: true});

  if(response === 0){
      return false;
  }
  else{
      return true;
  }

};

var capitalize = (string) => {
    const stringCapitalized = string.charAt(0).toUpperCase() + string.slice(1);
    return stringCapitalized;    
}

var createFile = (name, extension, data) => {
    // fs.writeFile(`${name}.${extension}`, data, err => {
    //     // In case of a error throw err.
    //   if (err) throw err;
    //    });

       if(extension.includes("php")){
       data.replace(`$this->response->setOutput($this->load->view('information/moduletemplate', $data));`, `$this->response->setOutput($this->load->view('information/${name}, $data)`);
       fse.outputFile(`catalog/controller/information/${name}.${extension}`, data, err => {
        if(err) {
          console.log(err);
        } else {
          console.log('The file was saved!');
        }
      })
    }

    if(extension.includes("tpl")){
        fse.outputFile(`catalog/view/theme/default/template/information/${name}.${extension}`, data, err => {
         if(err) {
           console.log(err);
         } else {
           console.log('The file was saved!');
         }
       })
     }
  };


        var replaceData = (data, name) =>
        {
            const lname = name.toLowerCase();
            const uname = capitalize(name);

            let newData = data.replace("Moduletemplate", uname);
            newData = newData.replace("moduletemplate", lname);
            return newData;
        }


	var generateModule = function() {
		  console.log("welcome");
		  while (!name) {
			 var name = askName();
		  }

		const newPhpData = replaceData(php_data,name);
		var responseCarousel = askCarousel();
		  if(responseCarousel == true){
			var newTplData = tpl_data;
			//  my_str = newTplData;
			//  substr = `<?php echo $footer_discover; ?>`;
			//  inserttxt = owlCarousel_data;
			//  idx = my_str.index(substr);
			// console.log(idx);
		   // newTplData = newTplData.concat(owlCarousel);
		  } else{
		  const newTplData = tpl_data;
		 }
   
  
    createFile(name.toLowerCase(),'php', newPhpData );
    createFile(name.toLowerCase(),'tpl', newTplData );
  
}
     
 

generateModule();
