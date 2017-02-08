function abrirTelaPopup(opcoes) {
	if (opcoes && ((opcoes.url && opcoes.url.trim() != "") || (opcoes.html && opcoes.html.trim() != ""))) {
//		dlgCarregando.abrir();

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

		var close    = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDI5LjU3NiAyOS41NzYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI5LjU3NiAyOS41NzY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMTkuMDMsMTQuNzg4bDEwLjU0NiwxMC41NDZsLTQuMjQyLDQuMjQyTDE0Ljc4OCwxOS4wM0w0LjI0MiwyOS41NzZMMCwyNS4zMzRsMTAuNTQ2LTEwLjU0NkwwLDQuMjQyTDQuMjQyLDAgICBsMTAuNTQ2LDEwLjU0NkwyNS4zMzQsMGw0LjI0Miw0LjI0MkwxOS4wMywxNC43ODh6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg=='' />";
		var compress = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDM5LjM2NyAzOS4zNjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDM5LjM2NyAzOS4zNjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8cGF0aCBkPSJNMzguNDg3LDUuMTIxbC03LjY5LDcuNjkxaDMuNzA3YzEuNjU2LDAsMywxLjM0MywzLDNjMCwxLjY1Ny0xLjM0NCwzLTMsM0gyMC41NTFWNC44NjNjMC0xLjY1NywxLjM0Mi0zLDMtM3MzLDEuMzQzLDMsMyAgIHYzLjcxbDcuNjk0LTcuNjk0YzEuMTcyLTEuMTcyLDMuMDY4LTEuMTcyLDQuMjQxLDBDMzkuNjYsMi4wNSwzOS42NiwzLjk1LDM4LjQ4Nyw1LjEyMXogTTEuODYyLDIzLjU1NmMwLDEuNjU1LDEuMzQzLDMsMywzSDguNTcgICBsLTcuNjkxLDcuNjljLTEuMTcyLDEuMTcxLTEuMTcyLDMuMDcxLDAsNC4yNDJDMS40NjUsMzkuMDc0LDIuMjMzLDM5LjM2NywzLDM5LjM2N3MxLjUzNS0wLjI5MywyLjEyMS0wLjg3OWw3LjY5My03LjY5NHYzLjcwOSAgIGMwLDEuNjU3LDEuMzQ0LDMsMywzYzEuNjU3LDAsMy0xLjM0MywzLTNWMjAuNTU2SDQuODYyQzMuMjA0LDIwLjU1NiwxLjg2MiwyMS44OTgsMS44NjIsMjMuNTU2eiIgZmlsbD0iI0ZGRkZGRiIvPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=' />";
		var expand   = "<img src='data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjI0cHgiIGhlaWdodD0iMjRweCIgdmlld0JveD0iMCAwIDM0LjY3IDM0LjY2OSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMzQuNjcgMzQuNjY5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTE2LjE1NiwxOC41MTNjMS4xNzMsMS4xNzIsMS4xNzMsMy4wNzEsMCw0LjI0M2wtNS45MTEsNS45MTJoMi4xODdjMS42NTcsMCwzLDEuMzQzLDMsM2MwLDEuNjU2LTEuMzQzLDMtMywzSDBWMjIuMjM4ICAgYzAtMS42NTUsMS4zNDMtMywzLTNjMS42NTYsMCwzLDEuMzQ1LDMsM3YyLjE4OWw1LjkxNS01LjkxNUMxMy4wODcsMTcuMzQxLDE0Ljk4NCwxNy4zNDEsMTYuMTU2LDE4LjUxM3ogTTIyLjIzOCwwLjAwMSAgIGMtMS42NTcsMC0zLDEuMzQzLTMsM3MxLjM0MywzLDMsM2gyLjE4OGwtNS45MTIsNS45MTNjLTEuMTczLDEuMTcyLTEuMTczLDMuMDcxLDAsNC4yNDNjMC41ODYsMC41ODYsMS4zNTQsMC44NzksMi4xMiwwLjg3OSAgIHMxLjUzNS0wLjI5MywyLjEyMS0wLjg3OGw1LjkxNS01LjkxNXYyLjE4OGMwLDEuNjU3LDEuMzQ0LDMsMywzczMtMS4zNDMsMy0zVjAuMDAxSDIyLjIzOEwyMi4yMzgsMC4wMDF6IiBmaWxsPSIjRkZGRkZGIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==' />";

		var telaPopup = jQuery(
			"<div class='fundoDlg' id='telaPopup'>"
				+"<div class='telaPopupCorpo'>"
					+"<div class='fa fa-times' id='telaPopupFechar'>" + close + "</div>"
					+"<fielset class='telaPopupFielset'>"
						+"<legend>" + opcoes.titulo + "<div class='size size-expand' title='Maximizar'>" + expand + "</div><div class='size size-compress' title='Minimizar'>" + compress + "</div></legend>"
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

		var btnMaximizar = jQuery('.size-expand', telaPopup);
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

		var btnMinimizar = jQuery('.size-compress', telaPopup);
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
//				dlgCarregando.fechar();
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
//				dlgCarregando.fechar();
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
//				dlgCarregando.fechar();
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
//				dlgCarregando.fechar();
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
//					dlgCarregando.abrir();
					jQuery.when(opcoes.ready()).done(
						function() {
//							dlgCarregando.fechar();
						}
					);
				}

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