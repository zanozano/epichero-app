$(document).ready(function () {
	$('form').submit(function (event) {
		event.preventDefault();
		let valueInput = $('#heroInput').val(); //INPUT
		let regExp = /([1-9][0-9]*)|0/; // Validador numerico
		if (valueInput != '' && regExp.test(valueInput) == true && valueInput < 732) {
			$.ajax({
				url: 'https://www.superheroapi.com/api.php/10226352771863306/' + valueInput,
				success: function (data) {
					let nombre = data.name;
					let biografia = data.biography;
					let apariencia = data.appearance;
					let trabajo = data.work;
					let conecciones = data.connections;
					let imagen = data.image.url;
					//
					$('#heroContent').html(`
                    <div class="row">
                        <div class="col-12 col-md-4 ">
                            <img class="img-fluid mx-auto mb-5" src="${imagen}" />
                        </div>
                        <div class="col-12 col-md-8">
                        <h2 class="text-center">${nombre}</h2>
                        <hr>
                            <div class="row">
                                <div class="col-12 col-md-6">
                                <h4>Biografia</h4>
                                <ul class="mb-5">
                                    <li><strong>Nombre Completo:</strong> ${
										Object.values(biografia)[0]
									}</li>
                                    <li><strong>Alter Egos:</strong> ${
										Object.values(biografia)[1]
									}</li>
                                    <li><strong>Alianzas:</strong> ${
										Object.values(biografia)[2]
									}</li>
                                    <li><strong>Lugar de Nacimiento:</strong> ${
										Object.values(biografia)[3]
									}</li>
                                    <li><strong>Primera Aparicion:</strong> ${
										Object.values(biografia)[4]
									}</li>
                                    <li><strong>Editor:</strong> ${Object.values(biografia)[5]}</li>
                                </ul>
                                </div>
                                <div class="col-12 col-md-6">
                                <h4>Apariencia</h4>
                                <ul class="mb-5">
                                    <li><strong>Genero:</strong> ${
										Object.values(apariencia)[0]
									}</li>
                                    <li><strong>Raza:</strong> ${Object.values(apariencia)[1]}</li>
                                    <li><strong>Altura:</strong> ${
										Object.values(apariencia)[2]
									}</li>
                                    <li><strong>Peso:</strong> ${Object.values(apariencia)[3]}</li>
                                    <li><strong>Color de ojos:</strong> ${
										Object.values(apariencia)[4]
									}</li>
                                    <li><strong>Color de pelo:</strong> ${
										Object.values(apariencia)[5]
									}</li>
                                </ul>
                                </div>
                                <div class="col-12 col-md-6">
                                <h4>Trabajo</h4>
                                <ul class="mb-5">
                                    <li><strong>Ocupación:</strong> ${
										Object.values(trabajo)[0]
									}</li>
                                    <li><strong>Base de Operaciones:</strong> ${
										Object.values(trabajo)[0]
									}</li>
                                </ul>
                                </div>
                                <div class="col-12 col-md-6">
                                <h4>Conecciones</h4>
                                <ul class="mb-5">
                                    <li><strong>Grupo de Afiliación:</strong> ${
										Object.values(conecciones)[0]
									}</li>
                                    <li><strong>Parientes:</strong> ${
										Object.values(conecciones)[0]
									}</li>
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    `);
					//
					let estadisticas = [];
					for (let o in data.powerstats) {
						estadisticas.push({
							indexLabel: o,
							y: data.powerstats[o] == 'null' ? 0 : data.powerstats[o],
						});
					}
					//
					let config = {
						animationEnabled: true,
						title: {
							text: `Estadisticas del superheroe ${nombre}`,
						},
						legend: {
							maxWidth: 500,
							itemWith: 220,
						},
						data: [
							{
								type: 'pie',
								toolTipContent: '<b>{indexLabel}</b>: {y}',
								showInLegend: 'true',
								legendText: '{indexLabel} - {y}',
								indexLabelFontSize: 16,
								indexLabel: '{indexLabel} - {y}',
								dataPoints: estadisticas,
							},
						],
					};
					let chart = new CanvasJS.Chart('heroChart', config);
					chart.render();
				},
				//
			});
		} else {
			$('#heroContent').html(
				`<p class="text-center text-alert mt-5"><strong>Ingresa un valor numerico entre 1 y 731</strong></p>`
			);
			$('#heroChart').html('');
		} //if
	});
});
