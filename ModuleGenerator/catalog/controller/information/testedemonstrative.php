<?php

class ControllerInformationTestedemonstrative extends Controller {

	private $error = array();

	public function index() {

		//$this->language->load('information/testedemonstrative');

		$this->document->setTitle("Clipuri");

		$data['column_left'] = $this->load->controller('common/column_left');

		$data['column_right'] = $this->load->controller('common/column_right');

		$data['content_top'] = $this->load->controller('common/content_top');

		$data['content_bottom'] = $this->load->controller('common/content_bottom');

		$data['footer'] = $this->load->controller('common/footer');

		$data['header'] = $this->load->controller('common/header');

		$this->response->setOutput($this->load->view('information/testedemonstrative', $data));
	}
}
?>

