class EpicrisisSerializer < ActiveModel::Serializer
  attributes :dni, :nro_historia_clinica, :fecha_ingreso, :fecha_egreso, :infeccion
  has_one :infeccion
end
