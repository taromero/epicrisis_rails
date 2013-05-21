require 'capybara/rspec'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

RSpec.configure do |config|

  config.use_transactional_fixtures = false
  
  config.before(:suite) do
    DatabaseCleaner.strategy = :truncation
  end

  config.before(:each) do
    DatabaseCleaner.start
  end

  config.after(:each) do
    DatabaseCleaner.clean
  end

end

describe "Infeccion" do

  context "show", :js => true do
    before(:each) do
      @epicrisis = create(:epicrisis, infeccion: create(:infeccion, ascitis: create(:ascitis)))
      @infeccion = @epicrisis.infeccion
      visit "/#/epicrisis/" + @epicrisis.id.to_s
    end

    it "should display all the project's resources names" do
      @infeccion.nombre.should_not eq nil
      find('input.nombre').value.should eq @infeccion.nombre
    end

    it "should update ascitis exclusive properties" do
      find('.ascitis .realizado').value.should eq 'on'

      find('#gasa').set(true)
      find('#proteinas').set(100.3)
      find('#recuento_de_neutrofilos').set(50000)
      find('#citologico').set('unCitologico')
      find('#guardar').click()

      #esto hace que espere hasta la respuesta de que se guardo, sino el test falla porque la asercion se hace antes de que el controller termine de actualizar
      page.should have_css('#infeccion .status .success')

      ascitis = Ascitis.first
      ascitis.proteinas_totales.should eq 100.3
      ascitis.gasa.should eq true
      ascitis.recuento_de_neutrofilos.should eq 50000
      ascitis.citologico.should eq 'unCitologico'
    end
    # context "update", :js => true do

    # end
  end

end