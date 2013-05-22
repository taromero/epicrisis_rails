class Ascitis < CultivoGenerico
	attr_accessible :gasa, :proteinas_totales, :recuento_de_neutrofilos, :citologico

	validate :no_attrs_if_positivo_false

  	def no_attrs_if_positivo_false
  		if positivo == nil
			if not (gasa.nil? && proteinas_totales.nil? && recuento_de_neutrofilos.nil? && citologico.nil?)
				self.errors[:atributos_erroneos] = 'La ascitis no puede tener atributos si no fue realizada'
			end
		end
  	end
end