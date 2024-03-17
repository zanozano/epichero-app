$(document).ready(function () {
	$('form').submit(function (event) {
		event.preventDefault();
		let valueInput = $('#heroInput').val();

		let regExp = /([1-9][0-9]*)|0/;
		if (valueInput != '' && regExp.test(valueInput) == true && valueInput < 732) {

			$('#hero-banner').attr('class', 'd-none');
			$('#heroContent').html(`
                <div class="spinner-border text-danger" role="status"></div>
            `);

			$.ajax({
				url: 'https://www.superheroapi.com/api.php/10226352771863306/' + valueInput,
				success: function (data) {
					$('#heroContent').html('');
					let nombre = data.name || "Unknown";
					let biografia = data.biography || "Unknown";
					let apariencia = data.appearance || "Unknown";
					let trabajo = data.work || "Unknown";
					let conecciones = data.connections || "Unknown";
					let imagen = data.image.url || "URL_not_available";

					//
					$('#heroContent').html(`
					<div class="d-flex flex-column gap-5">
						<div class="row">
					
									<div class="col-md-6 col-12">
									<h2 class="text-center mb-4 fw-bold">${nombre}</h2>
										<img src="${imagen}" alt="superhero" class="img-fluid character"> 
									</div>
									
									<div class="col-md-3 col-12">
										<h5 class="fw-bold">Appearance</h5>
										<div class="mb-3">
										<label for="Gender" class="form-label">Gender</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[0]}" aria-label="${Object.values(apariencia)[0]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Race" class="form-label">Race</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[1]}" aria-label="${Object.values(apariencia)[1]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Height" class="form-label">Height</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[2]}" aria-label="${Object.values(apariencia)[2]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Weight" class="form-label">Weight</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[3]}" aria-label="${Object.values(apariencia)[3]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Eye Color" class="form-label">Eye Color</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[4]}" aria-label="${Object.values(apariencia)[4]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Hair Color" class="form-label">Hair Color</label>
										<input class="form-control" type="text" placeholder="${Object.values(apariencia)[5]}" aria-label="${Object.values(apariencia)[5]}" disabled>
										</div>
									</div>
									
									<div class="col-md-3 col-12">
										<h5 class="fw-bold">Biography</h5>
										<div class="mb-3">
										<label for="Full Name" class="form-label">Full Name</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[0]}" aria-label="${Object.values(biografia)[0]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="Alter Egos" class="form-label">Alter Egos</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[1]}" aria-label="${Object.values(biografia)[1]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="Alliances" class="form-label">Alliances</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[2]}" aria-label="${Object.values(biografia)[2]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="Place of Birth" class="form-label">Place of Birth</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[3]}" aria-label="${Object.values(biografia)[3]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="First Appearance" class="form-label">First Appearance</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[4]}" aria-label="${Object.values(biografia)[4]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="Publisher" class="form-label">Publisher</label>
										<input class="form-control" type="text" placeholder="${Object.values(biografia)[5]}" aria-label="${Object.values(biografia)[5]}" disabled>
										</div>
										</div>
						</div>
									
						<div class="row">
										
								<div class="col-md-4 col-12">
										<h5 class="fw-bold">Work</h5>
										<div class="mb-3">
										<label for="Occupation" class="form-label">Occupation</label>
										<input class="form-control" type="text" placeholder="${Object.values(trabajo)[0]}" aria-label="${Object.values(trabajo)[0]}" disabled>
										</div>
										
										<div class="mb-3">
										<label for="Base of Operations" class="form-label">Base of Operations</label>
										<input class="form-control" type="text" placeholder="${Object.values(trabajo)[1]}" aria-label="${Object.values(trabajo)[1]}" disabled>
										</div>
								
										<h5 class="fw-bold mt-4">Connections</h5>
										<div class="mb-3">
										<label for="Group Affiliation" class="form-label">Group Affiliation</label>
										<input class="form-control" type="text" placeholder="${Object.values(conecciones)[0]}" aria-label="${Object.values(conecciones)[0]}" disabled>
										</div>
									
										<div class="mb-3">
										<label for="Relatives" class="form-label">Relatives</label>
										<input class="form-control" type="text" placeholder="${Object.values(conecciones)[1]}" aria-label="${Object.values(conecciones)[1]}" disabled>
										</div>
									</div>

									<div class="mt-5 col-md-8 col-12 d-flex justify-content-center align-items-center">	
										<div id="showChart" class="d-flex justify-content-center align-items-center">
											<canvas id="heroChart"></canvas>
										</div>
									</div>
						</div>
							
					</div>
									`);


					let estadisticas = [];
					for (let label in data.powerstats) {
						estadisticas.push({
							indexLabel: label,
							stat: data.powerstats[label] == 'null' ? 0 : data.powerstats[label],
						});
					}

					let labels = estadisticas.map(item => item.indexLabel.charAt(0).toUpperCase() + item.indexLabel.slice(1).toLowerCase());
					let stats = estadisticas.map(item => parseInt(item.stat));

					const ctx = document.getElementById('heroChart').getContext('2d');
					new Chart(ctx, {
						type: 'bar',
						data: {
							labels: labels,
							datasets: [{
								data: stats,
								backgroundColor: [
									'#474D4B',
									'#7FB0B8',
									'#B2A6A3',
									'#295058',
									'#A83C42',
									'#D1923B'
								],
								borderColor: [
									'rgba(71, 77, 75, 1)',
									'rgba(127, 176, 184, 1)',
									'rgba(178, 166, 163, 1)',
									'rgba(41, 80, 88, 1)',
									'rgba(168, 60, 66, 1)',
									'rgba(209, 146, 59, 1)'
								],
								borderWidth: 1
							}]
						},
						options: {
							plugins: {
								legend: {
									display: false
								}
							},
							scales: {
								y: {
									beginAtZero: true
								}
							}
						}
					});
				},

			});
		} else {
			$('#heroContent').html(
				`<p class="text-center m-0"><strong>Ingresa un valor numerico entre 1 y 731</strong></p>`
			);
			$('#heroChart').html('');
		}
	});
});
