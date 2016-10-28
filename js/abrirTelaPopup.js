function abrirTelaPopup(opcoes) {
	if (opcoes && ((opcoes.url && opcoes.url.trim() != "") || (opcoes.html && opcoes.html.trim() != ""))) {
		dlgCarregando.abrir();

		if (!opcoes.titulo && opcoes.titulo.trim() == "") {
			opcoes.titulo = "Novo";
		}

		var dados = "";
		if (opcoes.dados) {
			jQuery.each(opcoes.dados, function(idx, el) {
				//ExpressÃ£o regular para identificar uma DATA
				if (el.match(/^\b(\d+\/\d+\/\d+)\b$/g) != null) {

					if (el.length == 10) {
						el = el.substring(6, 10) + el.substring(3, 5) + el.substring(0, 2);
					} else if (el.length == 8) {
						el = "20" + el.substring(6, 8) + el.substring(3, 5) + el.substring(0, 2);
					}

					opcoes.dados[idx+""] = el;
				}
			});

			dados = '&dados=' + JSON.stringify(opcoes.dados);
		}

		var espaco = 105;

		var telaPopup = jQuery(
			"<div class='fundoDlg' id='telaPopup'>"
				+"<div class='telaPopupCorpo'>"
					+"<i class='fa fa-times' id='telaPopupFechar'></i>"
					+"<fielset class='telaPopupFielset'>"
						+"<legend>" + opcoes.titulo + "<i aria-hidden='true' class='fa fa-expand' title='Maximizar'></i><i aria-hidden='true' class='fa fa-compress' title='Minimizar'></i></legend>"
						+"<div class='telaPopupContent carregando'>"
						+"</div>"
						+"<input class='btn' type='button' id='btnFechar' value='Fechar'/>"
					+"</fielset>"
				+"</div>"
			+"</div>"
		);

		var telaPopupFechar = jQuery('#telaPopupFechar', telaPopup);
		telaPopupFechar.click(
			function() {
				telaPopup.css("opacity", "0");
				setTimeout(
					function() {
						telaPopup.remove();
					}, 1000
				);
			}
		);

		var btnFechar = jQuery('#btnFechar', telaPopup);
		btnFechar.click(
			function() {
				telaPopupFechar.click();
			}
		);

		var btnMaximizar = jQuery('.fa-expand', telaPopup);
		btnMaximizar.click(
			function() {
				var corpo = jQuery('.telaPopupCorpo', telaPopup);
				corpo.addClass('maximizado');
				setTimeout(
					function() {
						jQuery(window).resize();
					}, 200
				);
			}
		);

		var btnMinimizar = jQuery('.fa-compress', telaPopup);
		btnMinimizar.click(
			function() {
				var corpo = jQuery('.telaPopupCorpo', telaPopup);
				corpo.removeClass('maximizado');

				jQuery(window).resize();
				setTimeout(
					function() {
						jQuery(window).resize();
					}, 100
				);
			}
		);

		if(opcoes && opcoes.salvar) {
			var labelSalvar = opcoes.labelSalvar ? opcoes.labelSalvar.trim() : "Salvar";
			try {
				var btnSalvar = jQuery("<input class='btn' type='button' id='btnSalvar' value='" + labelSalvar + "' style='background-color: rgb(75, 75, 75); right: " + espaco + "px;'/>");

				btnSalvar.click(
					function(event) {
						if(opcoes && opcoes.antesSalvar) {
							opcoes.antesSalvar();
						}

						var resp = false;

						jQuery.when(resp = opcoes.salvar()).done(
							function() {
								if (resp) {
									if (!isNaN(resp)) {
										MSG.mensagem({
											mensagem : "Inserido com sucesso.",
											tipo     : "success",
											callback : function() {
												btnFechar.click();

												if(opcoes && opcoes.depoisSalvar) {
													opcoes.depoisSalvar();
												}
											}
										});
									} else {
										MSG.mensagem({
											mensagem : resp,
											tipo     : "error",
											titulo   : "Erro ao salvar"
										});
									}

								}
							}
						);
					}
				);

				espaco += 87;
				btnSalvar.insertBefore(btnFechar);
			} catch(err) {

				MSG.mensagem({
					mensagem : "Verifique a funÃ§Ã£o salvar.",
					tipo     : "error"
				});
				dlgCarregando.fechar();
			}
		}

		if(opcoes && opcoes.editar) {
			var labelEditar = opcoes.labelEditar ? opcoes.labelEditar.trim() : "Salvar";
			try {
				var btnEditar= jQuery("<input class='btn' type='button' id='btnEditar' value='" + labelEditar + "' style='background-color: rgb(75, 75, 75); right: " + (espaco+1.75) + "px;'/>");

				btnEditar.click(
					function(event) {
						if(opcoes && opcoes.antesEditar) {
							opcoes.antesEditar();
						}

						var resp = false;

						jQuery.when(resp = opcoes.editar()).done(
							function() {
								if (resp) {
									if (resp == true) {
										MSG.mensagem({
											mensagem : "Editado com sucesso.",
											tipo     : "success",
											callback : function() {
												btnFechar.click();

												if(opcoes && opcoes.depoisEditar) {
													opcoes.depoisEditar();
												}
											}
										});
									} else {
										MSG.mensagem({
											mensagem : resp,
											tipo     : "error",
											titulo   : "Erro ao editar"
										});
									}

								}
							}
						);
					}
				);

				espaco += 87;
				btnEditar.insertBefore(btnFechar);
			} catch(err) {

				MSG.mensagem({
					mensagem : "Verifique a funÃ§Ã£o editar.",
					tipo     : "error"
				});
				dlgCarregando.fechar();
			}
		}

		if(opcoes && opcoes.excluir) {
			var labelExluir = opcoes.labelExluir ? opcoes.labelExluir.trim() : "Excluir";
			try {
				var btnExcluir = jQuery("<input class='btn' type='button' id='btnExcluir' value='" + labelExluir + "' style='background-color: #EC3237; right: " + espaco + "px;'/>");

				btnExcluir.click(
					function(event) {
						MSG.confirmar({
							callbackNao : function() {
							},
							callbackSim : function() {
								if(opcoes && opcoes.antesExcluir) {
									opcoes.antesExcluir();
								}

								var resp = false;

								jQuery.when(resp = opcoes.excluir()).done(
									function() {
										if (resp) {
											btnFechar.click();

											if(opcoes && opcoes.depoisExcluir) {
												opcoes.depoisExcluir();
											}
										}
									}
								);
							},
							mensagem : "Deseja realmente excluir esse item?",
							titulo   : "Excluir"
						});
					}
				);

				espaco += 87;
				btnExcluir.insertBefore(btnFechar);
			} catch(err) {

				MSG.mensagem({
					mensagem : "Verifique a funÃ§Ã£o excluir.",
					tipo     : "error"
				});
				dlgCarregando.fechar();
			}
		}

		if(opcoes && opcoes.outroBtn) {
			var labelOutroBtn = opcoes.labelOutroBtn ? opcoes.labelOutroBtn.trim() : "Outro";
			try {
				var btnOutroBtn = jQuery("<input class='btn' type='button' id='btnOutroBtn' value='" + labelOutroBtn + "' style='background-color: rgb(75, 75, 75); right: " + espaco + "px;'/>");

				btnOutroBtn.click(
					function(event) {
						opcoes.outroBtn();
					}
				);

				espaco += 107;
				btnOutroBtn.insertBefore(btnFechar);
			} catch(err) {

				MSG.mensagem({
					mensagem : "Verifique a funÃ§Ã£o outroBtn.",
					tipo     : "error"
				});
				dlgCarregando.fechar();
			}
		}


		jQuery("body").append(telaPopup);


		jQuery(window).resize(
			function(event) {
				var alturaBrowser    = jQuery(window).height();   // altura do browser
				var alturaPopup      = alturaBrowser - 100;       // altura do popup
				var telaPopupContent = jQuery(".telaPopupContent", telaPopup);
				var telaPopupCorpo   = jQuery(".telaPopupCorpo", telaPopup);

				if (alturaPopup < 250) {
					alturaPopup = alturaBrowser;
				}

				telaPopupCorpo.css({
					"max-height" : alturaPopup + "px"
				});

				if (telaPopupCorpo.hasClass('maximizado')) {

					telaPopupContent.css({
						"max-height" : (alturaBrowser - 64) + "px"
					});

				} else {
					telaPopupContent.css({
						"max-height" : (alturaPopup - 102) + "px"
					});
				}

				setTimeout(
					function() {
						var telaPopupCorpoAlt = telaPopupCorpo.height() + 48;
						telaPopupCorpo.css({
							"margin-top" : "-" + (telaPopupCorpoAlt / 2) + "px"
						});
					}, 250
				);
			}
		);

		telaPopup.css("opacity", "1");
		var def = new jQuery.Deferred();

		if (opcoes.url && opcoes.url.trim() != "") {
			jQuery.ajax({
				url: opcoes.url+'&titulo='+opcoes.titulo + dados,
				type: 'GET'
			}).done(
				function(retorno) {
					telaPopup.find(".carregando").html(retorno).removeClass('carregando');
				}
			).fail(
				function() {
					MSG.mensagem({
						mensagem : "Erro ao abrir a pÃ¡gina",
						tipo     : "error"
					});
				}
			).always(
				function() {
					jQuery(window).resize();
					setTimeout(
						function() {
							jQuery(window).resize();
							def.resolve();
						}, 1000
					);
				}
			);
		}

		if (opcoes.html && opcoes.html.trim() != "") {
			telaPopup.find(".carregando").html(opcoes.html).removeClass('carregando');
			def.resolve();
		}

		jQuery.when(def).done(
			function() {
				if(opcoes && opcoes.onload) {
					opcoes.onload();
				}

				if(opcoes && opcoes.ready) {
					dlgCarregando.abrir();
					jQuery.when(opcoes.ready()).done(
						function() {
							dlgCarregando.fechar();
						}
					);
				}

				inicializar();
				telaPopup.css("opacity", "1");
				setTimeout(
					function() {
						jQuery(window).resize();
					}, 100
				);
			}
		);
	}
}