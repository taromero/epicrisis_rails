class EpicrisisSerializer < ActiveModel::Serializer
  attributes :id, :dni, :nro_historia_clinica, :fecha_ingreso, :fecha_egreso, :infeccion
  has_one :infeccion
  has_one :medicacion_ingreso
end
